'use strict';

require.config({
    paths: {
        jquery: "../../bower_components/jquery/dist/jquery",
        underscore: "../../bower_components/underscore/underscore",
        handlebars: "../../bower_components/handlebars/handlebars.amd",
        text: "../../bower_components/requirejs-text/text",
        backbone: "../../bower_components/backbone/backbone",
        marionette: "../../bower_components/backbone.marionette/lib/backbone.marionette",
        localstorage: "../../bower_components/backbone.localstorage/backbone.localstorage",
        radio: "../../bower_components/backbone.radio/build/backbone.radio",
        //hbs: "../../bower_components/require-handlebars-plugin/hbs",
        es6promise: "../../bower_components/es6-promise/promise"
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        "marionette": {
            deps: ["backbone"],
            exports: "Marionette"
        }
    },
    generateSourceMaps: true,
    optimize: 'none',
    //name: 'main',
    out: 'app.js',
});