GoodgamesApp.Views.ReviewItem = Backbone.View.extend({
  template: JST['reviews/item'],

  events: {
    'click #edit-review': 'edit'
  },

  initialize: function (options) {
    this.author = options.author;

    this.listenTo(this.author, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ review: this.model, author: this.author });
    this.$el.html(content);

    this.$el.find("#given-score").rating();

    return this;
  },

  edit: function (event) {
    event.preventDefault();
  }
});
