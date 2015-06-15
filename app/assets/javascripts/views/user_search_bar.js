GoodgamesApp.Views.UserSearchBar = Backbone.View.extend({
  template: JST['user_search_bar'],

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
    // this.users = new GoodgamesApp.Collections.Users();
    // this.users.fetch({
    //   success: function () {
    //     this.results = this.users.where({ username: this.query.query });
    //     Backbone.history.navigate('/users', { trigger: true, results: this.results });
    //   }.bind(this)
    // });
  }
});
