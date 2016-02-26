define([
    'backbone',
    'localstorage',
    'models/TitleModel'
], function(Backbone, localstorage, TitleModel) {
    'use strict';

    var TitleCollection = Backbone.Collection.extend({
        model: TitleModel,

        localStorage: new Backbone.LocalStorage('test-items')
    });

    return TitleCollection;
});