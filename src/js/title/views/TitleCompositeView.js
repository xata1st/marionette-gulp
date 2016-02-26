define([
    'marionette',
    'title/views/TitleView',
    'text!title/templates/composite.html'
], function (Mn, TitleView, template) {
    'use strict';

    var TitleCompositeView = Mn.CompositeView.extend({
        tagName: 'div',

        className: 'col-xs-12',

        template: template,

        childView: TitleView,

        childViewContainer: '#container',

        ui: {
            'input': '#titleInput',
            'addButton': '#submitTitle',
            'removeButton': '#removeLastTitle'
        },

        events: {
            'click @ui.addButton': 'addModel',
            'click @ui.removeButton': 'removeLastModel'
        },

        addModel: function () {
            var title = this.ui.input.val().trim();
            if (title) {
                this.collection.add([{
                    title: title
                }]);

                this.collection.each(function (item) {
                    item.save();
                });

                this.ui.input.val('');
                this.ui.input.focus();
            }
        },

        removeLastModel: function () {
            this.collection.last().destroy();
        }
    });

    return TitleCompositeView;
});