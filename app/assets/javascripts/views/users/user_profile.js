GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  initialize: function () {
    this.userCollection = new GoodgamesApp.Collections.Collections();
    this.userCollection.fetch();

    this.userWishlist = new GoodgamesApp.Collections.Wishlists();
    this.userWishlist.fetch();

    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.ownedGames(), 'add', this.addOwnedGame);
    this.model.ownedGames().each(this.addOwnedGame.bind(this));

    this.listenTo(this.model.wishlistGames(), 'add', this.addWishlistGame);
    this.model.wishlistGames().each(this.addWishlistGame.bind(this));
  },

  addOwnedGame: function (game) {
    var collectionView = new GoodgamesApp.Views.CollectionItem({
      currentUser: this.model,
      collection: this.userCollection,
      model: game
    });
    this.addSubview('#collection', collectionView);
  },

  addWishlistGame: function (game) {
    var wishlistView = new GoodgamesApp.Views.WishlistItem({
      currentUser: this.model,
      collection: this.userWishlist,
      model: game
    });
    this.addSubview('#wishlist', wishlistView);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }
});
