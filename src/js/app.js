define([
    'handlebars',
    'backbone',
    'marionette',
    'title/TitleModule'
], function (Handlebars, Backbone, Mn, TitleModule) {
    'use strict';

    Mn.TemplateCache.prototype.loadTemplate = function (templateId, options) {
        var myTemplate = templateId;
        return myTemplate;
    };

    Mn.TemplateCache.prototype.compileTemplate = function (rawTemplate, options) {
        return Handlebars.compile(rawTemplate);
    };

    var app = new Mn.Application();

    //app.on('before:start', function() {
    //    app.setRootLayout();
    //});

    app.on('start', function () {
        var m = new TitleModule();

        Backbone.history.start();
    });

    app.start();
    console.log(app);
});

require(['app'], function () {

});