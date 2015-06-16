GoodgamesApp.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = new GoodgamesApp.Collections.Users()
                       .getOrFetch(CURRENT_USER_ID);
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
    $('.games-link').addClass("active");
    var indexView = new GoodgamesApp.Views.GamesIndex({
      collection: GoodgamesApp.games,
      currentUser: this.currentUser
    });
    this._swapView(indexView);
  },

  showGame: function (id) {
    $(".nav").find(".active").removeClass("active");
    var game = GoodgamesApp.games.getOrFetch(id);
    var showView = new GoodgamesApp.Views.GameShow({
      model: game,
      user: this.currentUser
    });
    this._swapView(showView);
  },

  showSearchResults: function (query) {
    $(".nav").find(".active").removeClass("active");
    var loadingView = new GoodgamesApp.Views.Loading();
    this._swapView(loadingView);
    var searchResults = new GoodgamesApp.Collections.SearchResults();
    searchResults.fetch({
      url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
           "&format=json&query=" + query + "&resources=game",
      success: function () {
        var resultsView = new GoodgamesApp.Views.SearchResults({
          collection: searchResults
        });
        this._swapView(resultsView);
      }.bind(this)
    });
  },

  showUserPage: function (id) {
    $(".nav").find(".active").removeClass("active");
    var user = new GoodgamesApp.Collections.Users().getOrFetch(id);
    var userView = new GoodgamesApp.Views.UserProfile({
      model: user,
      currentUser: this.currentUser
    });
    this._swapView(userView);
  },

  showCurrentUserPage: function () {
    $(".nav").find(".active").removeClass("active");
    $('#profile').addClass("active");
    var userView = new GoodgamesApp.Views.UserProfile({
      model: this.currentUser,
      currentUser: this.currentUser
    });
    this._swapView(userView);
  },

  userSearch: function (query) {
    $(".nav").find(".active").removeClass("active");
    $('#users-index').addClass("active");
    var users = new GoodgamesApp.Collections.Users();

    users.fetch({
      success: function () {
        var results = users.where({ username: query });
        var userSearchView = new GoodgamesApp.Views.UserSearchResults({
          collection: results
        });
        this._swapView(userSearchView);
      }.bind(this)
    });
  },

  usersPage: function () {
    $(".nav").find(".active").removeClass("active");
    $('#users-index').addClass("active");

    var users = new GoodgamesApp.Collections.Users();
    var userView = new GoodgamesApp.Views.UsersIndex({ collection: users });
    this._swapView(userView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
