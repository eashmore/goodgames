GoodgamesApp.Views.Nav = Backbone.View.extend({

  template: JST['nav/nav'],

  initialize: function (options) {},

  render: function () {
    this.$el.html(this.template);
    var searchView = new GoodgamesApp.Views.SearchBar();
    this.$el.find('#search-bar').html(searchView.render().$el);

    return this;
  }
});
