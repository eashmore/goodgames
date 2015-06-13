GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  initialize: function () {
    this.userCollection = new GoodgamesApp.Collections.Collections();
    this.userCollection.fetch();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.ownedGames(), 'add', this.addGame);
    this.model.ownedGames().each(this.addGame.bind(this))
  },

  addGame: function (game) {
    var collectionView = new GoodgamesApp.Views.CollectionItem({
      currentUser: this.model,
      collection: this.userCollection,
      model: game
    });
    this.addSubview('#collection', collectionView);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }
});
