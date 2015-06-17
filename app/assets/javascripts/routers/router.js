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
    var indexView = new GoodgamesApp.Views.GamesIndex({
      collection: GoodgamesApp.games,
      currentUser: this.currentUser
    });
    this._swapView(indexView);
    $('.games-link').addClass("active");
  },

  showGame: function (id) {
    var game = GoodgamesApp.games.getOrFetch(id);
    var showView = new GoodgamesApp.Views.GameShow({
      model: game,
      user: this.currentUser
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
      currentUser: this.currentUser
    });
    this._swapView(userView);
  },

  showCurrentUserPage: function () {
    var userView = new GoodgamesApp.Views.UserProfile({
      model: this.currentUser,
      currentUser: this.currentUser
    });
    this._swapView(userView);
    $('#profile').addClass("active");
  },

  userSearch: function (query) {

    var users = new GoodgamesApp.Collections.Users();

    users.fetch({
      success: function () {
        var results = users.where({ username: query });
        var userSearchView = new GoodgamesApp.Views.UserSearchResults({
          collection: results
        });
        this._swapView(userSearchView);

        $('#users-index').addClass("active");
      }.bind(this)
    });
  },

  usersPage: function () {
    var users = new GoodgamesApp.Collections.Users();
    var userView = new GoodgamesApp.Views.UsersIndex({ collection: users });
    this._swapView(userView);

    $('#users-index').addClass("active");
  },

  _swapView: function (view) {
    $(".nav").find(".active").removeClass("active");
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});


// $.ajax({
//   url: "http://www.giantbomb.com/api/search/?api_key=3237292f5c8790f3237e3aa779cc19b3edbf1cdb&query=zelda&resources=game&format=jsonp",
//   dataType: 'jsonp', jsonpCallback: 'json_callback',contentType: "application/json",jsonp: 'json_callback',
// success: function(dataWeGotViaJsonp){
//                        console.log(arguments);
//                     }
// , error: function () { console.log(arguments) }})
