GoodgamesApp.Views.CommentItem = Backbone.View.extend({
  template: JST['comments/item'],

  events: {
    'click .username': 'toProfile',
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);

    return this;
  },

  toProfile: function (event) {
    event.preventDefault();
    Backbone.history.navigate('users/' + this.model.escape('user_id'),
      { trigger: true }
    );
  },
});
