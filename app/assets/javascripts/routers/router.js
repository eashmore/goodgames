GoodgamesApp.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'user': 'showCurrentUserPage',
    'users': 'usersPage',
    'users/?/:query': 'userSearch',
    'users/:id': 'showUserPage',
    'games/search/?/:query': 'showSearchResults',
    'games/:id': 'showGame'

  },

  index: function () {
    $(".nav").find(".active").removeClass("active");

    var indexView = new GoodgamesApp.Views.GamesIndex({
      collection: GoodgamesApp.games,
      currentUser: GoodgamesApp.currentUser
    });
    this._swapView(indexView);
    setTimeout(function () {
      $('.games-link').addClass("active");
    }, 300);
  },

  showGame: function (id) {
    var game = GoodgamesApp.games.getOrFetch(id);
    var showView = new GoodgamesApp.Views.GameShow({
      model: game,
      user: GoodgamesApp.currentUser
    });
    this._swapView(showView);
  },

  showSearchResults: function (query) {
    var loadingView = new GoodgamesApp.Views.Loading();
    this._swapView(loadingView);
    var searchResults = new GoodgamesApp.Collections.SearchResults();
    searchResults.fetch({
      url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
           "&format=jsonp&query=" + query + "&resources=game&limit=35",
      dataType: 'jsonp',
      jsonpCallback: 'json_callback',
      contentType: "application/json",
      jsonp: 'json_callback',
      success: function () {
        var resultsView = new GoodgamesApp.Views.SearchResults({
          collection: searchResults
        });
        this._swapView(resultsView);
      }.bind(this)
    });
  },

  showUserPage: function (id) {
    var user = new GoodgamesApp.Collections.Users().getOrFetch(id);
    var userView = new GoodgamesApp.Views.UserProfile({
      model: user,
      currentUser: GoodgamesApp.currentUser
    });
    this._swapView(userView);
  },

  showCurrentUserPage: function () {
    $(".nav").find(".active").removeClass("active");
    var userView = new GoodgamesApp.Views.UserProfile({
      model: GoodgamesApp.currentUser,
      currentUser: GoodgamesApp.currentUser
    });
    this._swapView(userView);
    setTimeout(function () {
      $('#profile').addClass("active");
    }, 400);
  },

  userSearch: function (query) {
    $(".nav").find(".active").removeClass("active");

    var users = new GoodgamesApp.Collections.Users();

    users.fetch({
      success: function () {
        var results = users.where({ username: query });
        var userSearchView = new GoodgamesApp.Views.UserSearchResults({
          collection: results
        });
        this._swapView(userSearchView);
        setTimeout(function () {
          $('#users-index').addClass("active");
        }, 300);
      }.bind(this)
    });
  },

  usersPage: function () {
    $(".nav").find(".active").removeClass("active");
    var users = new GoodgamesApp.Collections.Users();
    var userView = new GoodgamesApp.Views.UsersIndex({ collection: users });
    this._swapView(userView);

    setTimeout(function () {
      $('#users-index').addClass("active");
    }, 400);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
