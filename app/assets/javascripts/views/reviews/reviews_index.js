GoodgamesApp.Views.ReviewsIndex = Backbone.CompositeView.extend({

  template: JST['reviews/index'],

  events: {
    'click .btn-compose': 'addForm'
  },

  initialize: function (options) {
    this.game = options.game;

    this.listenTo(this.game.reviews(), 'add', this.addNewReview);
    this.listenTo(this.game.reviews(), 'add', this.setRank);

    this.listenTo(this.collection, 'add', this.addReview);
    this.listenTo(this.collection, 'change', this.render);
    this.collection.each(this.addReview.bind(this));
  },

  addReview: function (review) {
    var itemView = new GoodgamesApp.Views.ReviewItem({
      model: review,
      collection: this.collection
    });
    this.addSubview('#review-list', itemView);
  },

  addNewReview: function (review) {
    var itemView = new GoodgamesApp.Views.ReviewItem({
      model: review,
      collection: this.collection
    });
    this.addSubview('#review-list', itemView, 'prepend');
  },


  addForm: function (event) {
    event.preventDefault();
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

    this.listenForScroll.call(this);


    return this;
  },

  setRank: function () {
    var numReviews = GoodgamesApp.currentUser.reviews().where({
      commentable_type: 'Game'
    }).length + 1;
    ranks = new GoodgamesApp.Collections.Ranks();
    ranks.fetch({
      success: function () {
        ranks.slice(1).forEach(function(rank) {
          if (numReviews >= rank.escape('score')) {
            GoodgamesApp.currentUser.set({ rank_id: rank.id });
            GoodgamesApp.currentUser.save();
          }
        });
      }.bind(this)
    });
  },

  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: parseInt(view.collection.page) + 1,
                  game_id: view.game.id },
          remove: false,
        });
      }
    }
  }

});
