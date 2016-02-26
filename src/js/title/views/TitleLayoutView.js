define([
    'marionette',
    'text!title/templates/layout.html'
], function (Mn, template) {
    'use strict';

    var TitleLayoutView = Mn.LayoutView.extend({
        el: 'body',

        template: template,

        regions: {
            itemContainer: '#itemContainer'
        }
    });

    return TitleLayoutView;
});