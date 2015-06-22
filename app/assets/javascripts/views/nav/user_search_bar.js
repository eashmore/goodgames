GoodgamesApp.Views.UserSearchBar = Backbone.View.extend({
  template: JST['nav/user_search_bar'],

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
    this.query = this.$el.serializeJSON();

    Backbone.history.navigate('/users/?/' + this.query.query, { trigger: true });
  }
});
