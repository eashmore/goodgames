GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  templateShow: JST['users/show'],

  initialize: function (options) {
    window.scrollTo(0,0);

    this.currentUser = options.currentUser;

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
      user: this.model,
      collection: this.userCollection,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('#collection', collectionView);
  },

  addWishlistGame: function (game) {
    var wishlistView = new GoodgamesApp.Views.WishlistItem({
      user: this.model,
      collection: this.userWishlist,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('#wishlist', wishlistView);
  },

  render: function () {
    var content;
    if (this.model === this.currentUser) {
      content = this.template({ user: this.model });
    } else {
      content = this.templateShow({ user: this.model });
    }
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }
});