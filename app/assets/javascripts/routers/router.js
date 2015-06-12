GoodgamesApp.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'games/search/?/:query': 'showSearchResults',
    'games/:id': 'showGame'
  },

  index: function () {
    var indexView = new GoodgamesApp.Views.GamesIndex({
      collection: GoodgamesApp.games
    });
    this._swapView(indexView);
  },

  showGame: function (id) {
    // pass search result as model to get more info
    var game = GoodgamesApp.games.getOrFetch(id);
    var showView = new GoodgamesApp.Views.GameShow({ model: game });
    this._swapView(showView);
  },

  showSearchResults: function (query) {
    var searchResults = new GoodgamesApp.Collections.SearchResults();
    searchResults.fetch({
      url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
           "&format=json&query=" + query + "&resources=game",
    });
    var resultsView = new GoodgamesApp.Views.SearchResults({
      collection: searchResults
    });
    this._swapView(resultsView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
