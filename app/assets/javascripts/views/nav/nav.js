GoodgamesApp.Views.Nav = Backbone.View.extend({

  template: JST['nav/nav'],

  events: {
    'click #profile': 'toProfile',
    'click #games-link': 'toGamesIndex',
    'click #users-index': 'toUserIndex',
    'click .search-games': 'searchGamesBar',
    'click .search-users': 'searchUserBar'
  },

  initialize: function () {
    this.listenTo(GoodgamesApp.currentUser, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template);
    this.searchGamesBar();

    return this;
  },

  searchGamesBar: function (event) {
    event && event.preventDefault();
    var searchView = new GoodgamesApp.Views.SearchBar();
    this._swapSearch(searchView);
  },

  searchUserBar: function (event) {
    event.preventDefault();
    var searchView = new GoodgamesApp.Views.UserSearchBar();
    this._swapSearch(searchView);
  },

  toProfile: function (event) {
    event.preventDefault();

    Backbone.history.navigate('/user', { trigger: true });
  },

  toGamesIndex: function (event) {
    event.preventDefault();
    // this.searchGamesBar(event);
    Backbone.history.navigate('', { trigger: true });
  },

  toUserIndex: function (event) {
    event.preventDefault();
    // this.searchUserBar(event);
    Backbone.history.navigate('/users', { trigger: true });
  },

  _swapSearch: function (searchView) {
    this._currentSearch && this._currentSearch.remove();
    this._currentSearch = searchView;
    this.$el.find('#search-bar').html(searchView.render().$el);
  }
});
