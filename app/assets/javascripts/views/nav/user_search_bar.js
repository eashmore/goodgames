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
    var query = this.$el.serializeJSON().query;
    if (query.length) {
      Backbone.history.navigate('/users/search/' + query, {
        trigger: true
      });
    }
  }
});
