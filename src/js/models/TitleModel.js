define([
    'backbone'
], function(Backbone) {
    'use strict';

    var TitleModel = Backbone.Model.extend({
        defaults: {
            title: 'xata'
        }
    });

    return TitleModel;
});