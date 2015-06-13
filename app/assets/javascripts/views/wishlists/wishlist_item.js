GoodgamesApp.Views.WishlistItem = Backbone.View.extend({

  template: JST['wishlists/item'],

  events: {
    'click #delete-item': "deleteGame"
  },

  initialize: function (options) {
    this.currentUser = options.currentUser;
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);

    return this;
  },

  deleteGame: function (event) {
    event.preventDefault();
    var currentWishlist = this.collection.where({
      user_id: this.currentUser.id,
      game_id: this.model.id
    })[0];
    currentWishlist.destroy({
      success: function() {
        this.currentUser.wishlistGames().remove(this.model);
        this.remove();
      }.bind(this)
    });
  }
});
