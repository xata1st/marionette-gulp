define([
    'marionette'
], function (Mn) {
    'use strict';

    console.log(Mn.AppRouter);

    var TitleRouter = Mn.AppRouter.extend({
        appRoutes: {
            '*filter': 'titles'
            //'some/route': 'someRoute'
            //'/': 'initialize',
            //'/xata': 'initialize'
        }
    });

    return TitleRouter;
});