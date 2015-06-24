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
    $(".nav").find(".active").removeClass("active");

    var game = GoodgamesApp.games.getOrFetch(id);
    var showView = new GoodgamesApp.Views.GameShow({
      model: game,
      user: GoodgamesApp.currentUser
    });
    this._swapView(showView);
  },

  showSearchResults: function (query) {
    $(".nav").find(".active").removeClass("active");

    var resultsView = new GoodgamesApp.Views.SearchResults({
      query: query
    });
    this._swapView(resultsView);
  },

  showUserPage: function (id) {
    $(".nav").find(".active").removeClass("active");
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
    }, 500);
  },

  userSearch: function (query) {
    $(".nav").find(".active").removeClass("active");

    var users = new GoodgamesApp.Collections.Users();

    users.fetch({
      success: function () {
        var results = [];
        users.each(function (user) {
          var username = user.escape('username').toLowerCase();
          if (username === query.toLowerCase()) {
            results.push(user);
          }
        });
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
