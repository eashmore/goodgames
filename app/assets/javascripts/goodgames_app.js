window.GoodgamesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    GoodgamesApp.games = new GoodgamesApp.Collections.Games();
    GoodgamesApp.games.fetch();

    GoodgamesApp.currentUser = new GoodgamesApp.Collections.Users()
                               .getOrFetch(CURRENT_USER);

    var $rootEl = $("#main");
    var router = new GoodgamesApp.Routers.Router( { $rootEl: $rootEl });
    var nav = new GoodgamesApp.Views.Nav();

    $('#nav').html(nav.render().$el);

    Backbone.history.start();
  }
};
