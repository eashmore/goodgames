GoodgamesApp.Views.SearchBar = Backbone.View.extend({
  template: JST['nav/search_bar'],

  tagName: 'form',

  events: {
    'click button': 'search'
  },

  render: function () {
    this.$el.html(this.template);
    return this;
  },

  search: function (event) {
    event.preventDefault();
    var query = this.$el.serializeJSON().query;
    if (query.length) {
      this.$el.find('#query-bar').val('');
      Backbone.history.navigate("games/search/" + query, {
        trigger: true
      });
    }
  }
});
