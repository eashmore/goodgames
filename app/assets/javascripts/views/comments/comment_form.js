GoodgamesApp.Views.CommentForm = Backbone.View.extend({

  tagName: 'form',

  template: JST['comments/form'],

  events: {
    'click .compose': 'submit'
  },

  initialize: function (options) {
    this.user = options.user;
  },

  render: function () {
    var content = this.template({ user: this.user });
    this.$el.html(content);
    return this;
  },

  submit: function () {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var comment = new GoodgamesApp.Models.Review();
    comment.set(attrs);
    comment.save({}, {
      success: function () {
        this.user.comments().add(comment);
        this.render();
      }.bind(this),
      error: function (model, response) {
        this.$el.find('.errors').html(
          response.responseText.slice(1,-1).split(',').join('<br>')
        );
      }.bind(this)
    });
  }
});
