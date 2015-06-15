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
    debugger
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var comment = new GoodgamesApp.Models.Review();
    comment.set(attrs);
    comment.save({}, {
      success: function () {
        this.collection.add(comment);
        this.render();
      }.bind(this)
    });
  }
});
