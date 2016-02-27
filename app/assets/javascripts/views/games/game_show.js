GoodgamesApp.Views.GameShow = Backbone.CompositeView.extend({

  template: JST['games/show'],

  initialize: function (options) {
    window.scrollTo(0, 0);
    this.currentUser = options.user;
    this.reviews = new GoodgamesApp.Collections.GameReviews();
    this.reviews.fetch({
      data: { page: 1,
              game_id: this.model.id
            }
    });
    this.wishlist = new GoodgamesApp.Collections.Wishlists();
    this.addReviewIndex();

    this.listenTo(this.currentUser.wishlistGames(), 'add remove', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.reviews(), 'add', this.render);
  },

  events: {
    'click .collection-button': 'addToCollection',
    'click .wishlist-button': 'addToWishlist',
    'click .remove-game': "removeFromWishlist"
  },

  render: function () {
    var platforms = [];
    if (this.model.get('platforms')) {
      platforms = this.model.get('platforms').split('@@@');
    }

    var content = this.template({
      game: this.model,
      currentUser: this.currentUser,
      platforms: platforms
    });
    this.$el.html(content);
    this.attachSubviews();
    this.displayScore();

    return this;
  },

  displayScore: function () {
    if (this.model.reviews().length) {
      this.$el.find('.average-score').rating();
    } else {
      this.$el.find('.average-score').css('display', 'none');
    }
  },

  addReviewIndex: function () {
    var reviewView = new GoodgamesApp.Views.ReviewsIndex({
      collection: this.reviews,
      game: this.model
    });
    this.addSubview('.game-reviews', reviewView);
  },

  addToCollection: function (event) {
    event.preventDefault();
    var collection = new GoodgamesApp.Models.Collection();
    collection.set({
      user_id: this.currentUser.id,
      game_id: this.model.id,
      user_name: this.currentUser.escape('username'),
      game_name: this.model.escape('name')
    });
    collection.save({}, {
      success: function () {
        this.currentUser.ownedGames().add(this.model);
        this.render();
      }.bind(this)
    });
  },

  addToWishlist: function (event) {
    event.preventDefault();
    var wishlist = new GoodgamesApp.Models.Wishlist();
    wishlist.set({
      user_id: this.currentUser.id,
      game_id: this.model.id
    });
    wishlist.save({}, {
      success: function () {
        this.currentUser.wishlistGames().add(this.model);
        this.render();
      }.bind(this)
    });
  },

  removeFromWishlist: function (event) {
    event.preventDefault();
    this.wishlist.fetch({
      success: function () {
        this.destroyWhishlistItem();
      }.bind(this)
    });
  },

  destroyWhishlistItem: function () {
    var currentWishlist = this.wishlist.where({
      game_id: this.model.id,
      user_id: this.currentUser.id,
    })[0];
    currentWishlist.destroy({
      success: function () {
        this.currentUser.wishlistGames().remove(this.model);
        this.render();
      }.bind(this)
    });
  }
});
