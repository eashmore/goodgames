GoodgamesApp.Views.ReviewsProfile = Backbone.CompositeView.extend({

  template: JST['reviews/profile_reviews'],

  events: {
    'click .close': 'remove',
    'click .m-backdrop': 'remove',
    'click #game-name': 'remove'
  },

  addClass: 'review-profile-index',

  initialize: function () {
    this.collection.forEach(this.addUserReview.bind(this));
  },

  addUserReview: function (review) {
    var itemView = new GoodgamesApp.Views.ReviewItem({ model: review });
    this.addSubview('.review-list', itemView, 'prepend');
  },

  render: function () {
    this.$el.html(this.template);

    this.attachSubviews();

    return this;
  }

});
