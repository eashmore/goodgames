GoodgamesApp.Views.CommentItem = Backbone.View.extend({
  template: JST['comments/item'],

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);

    return this;
  }
});
