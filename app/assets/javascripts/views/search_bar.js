GoodgamesApp.Views.SearchBar = Backbone.View.extend({
  template: JST['search_bar'],

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
    var query = this.$el.serializeJSON();
    Backbone.history.navigate("games/search/?/" + query.query, { trigger: true });
  }
});
