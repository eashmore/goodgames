GoodgamesApp.Views.UserItem = Backbone.View.extend({
  template: JST['users/item'],

  render: function () {
    var numberOfReviews = this.model.reviews().length;
    var content = this.template({ user: this.model, numberOfReviews: numberOfReviews });
    this.$el.html(content);

    return this;
  }
});
