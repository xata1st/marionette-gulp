"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    dest = require('gulp-dest'),
    rimraf = require('rimraf'),
    _ = require('lodash'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    rjs = require('gulp-requirejs-optimize'),
    concatCss = require('gulp-concat-css'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    shell = require('gulp-shell'),
    sourcemaps = require('gulp-sourcemaps'),
    chai = require('chai'),
    mocha = require('mocha'),
    gulpMocha = require('gulp-mocha'),
    pioneer = require('pioneer'),
    seleniumWebdriver = require('selenium-webdriver'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

var server = {
    host: 'localhost',
    port: '9000'
};
var buildPath = './build/';
var bootstrapDir = 'bower_components/bootstrap-sass/assets/';
var path = {
    src: {
        html: 'src/*.html',
        img: 'src/img/**/*.*',
        rConfigFile: 'src/requireConfig.js',
        js: 'src/js/app.js',
        sass: 'src/sass/main.scss',
        fonts: 'src/fonts/*.*'
    },
    lib: {
        bootstrapFonts: bootstrapDir + 'fonts/bootstrap/**/*.scss',
        bootstrapScss: bootstrapDir + 'stylesheets/_bootstrap.scss'
    },
    dest: {
        html: buildPath,
        img: buildPath + 'img/',
        js: buildPath + 'js/',
        fonts: buildPath + 'fonts/',
        css: buildPath
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/**/*.*',
        img: 'src/img/**/*.*',
        sass: 'src/sass/**/*.*'
    }
};

gulp.task('bower install', shell.task('bower install'));
gulp.task('bower update', shell.task('bower update'));

gulp.task('html', function(cb) {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(rjs({
            mainConfigFile: path.src.rConfigFile,
            optimize: 'none'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.js))
        .pipe(connect.reload())
        .on('error', function(e) { console.log(e); });
});

gulp.task('copy:require', function() {
    gulp.src('bower_components/requirejs/require.js')
        .pipe(gulp.dest(buildPath));
});

gulp.task('sass', function() {
    return gulp.src(path.src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({
            //outputStyle: 'compressed',
            //includePaths: [bootstrapDir + 'stylesheets/'],
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dest.css))
        .pipe(connect.reload())
        .on('error', function(e) { console.log(e); });
});

gulp.task('image', function() {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dest.img))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    return gulp.src([path.src.fonts, path.lib.bootstrapFonts])
        .pipe(gulp.dest(path.dest.fonts));
});

gulp.task('clean', function (cb) {
    rimraf(buildPath, cb);
});

gulp.task('reload', connect.reload);

gulp.task('build', [
    'clean',
    'js',
    'html',
    'sass',
    'copy:require',
    'image',
    'reload'
]);

gulp.task('watch', function() {
    gulp.watch([path.watch.html], ['html', 'reload']);

    //watch([path.src.style], function(event, cb) {
    //    gulp.start('style:build');
    //});

    //watch([path.watch.js], function(event, cb) {
    //    gulp.start('js');
    //});

    gulp.watch([path.watch.sass], ['sass', 'reload']);

    gulp.watch([path.watch.js], ['js', 'reload']);

    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });

    //watch([path.watch.fonts], function(event, cb) {
    //    gulp.start('fonts:build');
    //});
});

gulp.task('webserver', function() {
    connect.server({
        root: 'build',
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('webserver:stop', function() {
    connect.serverClose();
});

gulp.task('default', ['webserver', 'build', 'watch']);