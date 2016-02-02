GoodgamesApp.Views.Nav = Backbone.CompositeView.extend({

  template: JST['nav/nav'],

  events: {
    'click .nav-profile': 'toProfile',
    'click .nav-games': 'toGamesIndex',
    'click .nav-users': 'toUserIndex',
    'click .search-games': 'searchGamesBar',
    'click .search-users': 'searchUserBar'
  },

  render: function () {
    this.$el.html(this.template);
    this.searchGamesBar();
    this.addUserInfo();
    this.attachSubviews();
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

  addUserInfo: function () {
    var userInfo = new GoodgamesApp.Views.UserInfo();
    this.addSubview('.nav-user-info', userInfo);
  },

  toProfile: function (event) {
    event.preventDefault();
    Backbone.history.navigate('/user', { trigger: true });
  },

  toGamesIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate('', { trigger: true });
  },

  toUserIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate('/users', { trigger: true });
  },

  _swapSearch: function (searchView) {
    this._currentSearch && this._currentSearch.remove();
    this._currentSearch = searchView;
    this.$el.find('.search-bar').html(searchView.render().$el);
  }
});
