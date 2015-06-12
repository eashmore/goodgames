GoodgamesApp.Views.Nav = Backbone.View.extend({

  template: JST['nav/nav'],

  events: {
    'click #profile': 'toProfile'
  },

  initialize: function (options) {},

  render: function () {
    this.$el.html(this.template);
    var searchView = new GoodgamesApp.Views.SearchBar();
    this.$el.find('#search-bar').html(searchView.render().$el);

    return this;
  },

  toProfile: function (event) {
    event.preventDefault();
    Backbone.history.navigate('/user', { trigger: true });
  }
});
