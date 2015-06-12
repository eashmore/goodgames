GoodgamesApp.Views.ReviewsIndex = Backbone.CompositeView.extend({

  template: JST['reviews/index'],

  initialize: function (options) {
    this.game = options.game;
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'add', this.addReview);
    this.collection.each(this.addReview.bind(this));
  },

  addReview: function (review) {
    var itemView = new GoodgamesApp.Views.ReviewItem({ model: review });
    this.addSubview('#review-list', itemView, 'prepend');
  },

  render: function () {
    this.$el.html(this.template);
    var newReview = new GoodgamesApp.Models.Review();
    var formView = new GoodgamesApp.Views.ReviewForm({
      model: newReview,
      collection: this.collection,
      game: this.game
    });
    var form = this.$el.find('#new-form');
    form.html(formView.render().$el);

    this.attachSubviews();

    return this;
  }

});
