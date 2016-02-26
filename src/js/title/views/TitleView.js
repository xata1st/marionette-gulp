define([
    'marionette',
    'text!title/templates/title.html'
], function (Mn, template) {
    'use strict';

    var TitleView = Mn.ItemView.extend({
        tagName: 'div',

        className: 'title',

        template: template,

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        }
    });

    return TitleView;
});