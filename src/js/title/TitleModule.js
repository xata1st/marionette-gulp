define([
    'marionette',
    'title/TitleRouter',
    'title/controllers/TitleController'
], function (Mn, TitleRouter, TitleController) {
    'use strict';

    var TitleModule = Mn.Object.extend({
        initialize: function () {
            this.router = new TitleRouter({
                controller: new TitleController()
            });
        }
    });

    return TitleModule;
});