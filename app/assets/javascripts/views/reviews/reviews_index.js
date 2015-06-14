GoodgamesApp.Views.ReviewsIndex = Backbone.CompositeView.extend({

  template: JST['reviews/index'],

  events: {
    'click .btn-compose': 'addForm'
  },

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

  addForm: function () {
    var newReview = new GoodgamesApp.Models.Review();
    var formView = new GoodgamesApp.Views.ReviewForm({
      model: newReview,
      collection: this.collection,
      game: this.game
    });
    $('body').prepend(formView.render().$el);
  },

  render: function () {
    this.$el.html(this.template);

    this.attachSubviews();

    return this;
  }

});
