GoodgamesApp.Views.ReviewItem = Backbone.View.extend({
  template: JST['reviews/item'],

  events: {
    'click #edit-review': 'edit'
  },

  render: function () {
    var content = this.template({ review: this.model });
    this.$el.html(content);

    this.$el.find("#given-score").rating();

    return this;
  },

  edit: function (event) {
    event.preventDefault();
  }
});
