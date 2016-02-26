define([
    'marionette',
    'models/TitleCollection',
    'title/views/TitleLayoutView',
    'title/views/TitleCompositeView'
], function (Mn, TitleCollection, TitleLayoutView, TitleCompositeView) {
    'use strict';

    var TitleController = Mn.Object.extend({
        initialize: function () {
            console.log('controller:init');

            this.layout = new TitleLayoutView();
            this.layout.render();

            this.collection = new TitleCollection();
            this.collection.fetch();

            this.layout.showChildView('itemContainer', new TitleCompositeView({
                collection: this.collection
            }));

            console.dir(this.layout);
        },

        titles: function (val) {
            console.log('titles: ', val);
        },

        someRoute: function (val) {
            console.log('someRoute: ', val);
        }
    });

    return TitleController;
});