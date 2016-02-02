GoodgamesApp.Views.WishlistItem = Backbone.View.extend({

  template: JST['wishlists/item'],

  button: JST['wishlists/button'],

  events: {
    'click .remove-game': "removeGame"
  },

  initialize: function (options) {
    this.user = options.user;
    this.currentUser = options.currentUser;
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);

    if (this.user.id === this.currentUser.id) {
      this.$el.find('.delete-button').html(this.button);
    }

    return this;
  },

  removeGame: function (event) {
    event.preventDefault();
    var currentWishlist = this.collection.where({
      user_id: this.currentUser.id,
      game_id: this.model.id
    })[0];

    currentWishlist.destroy({
      success: function () {
        this.currentUser.wishlistGames().remove(this.model);
        this.remove();
      }.bind(this)
    });
  }
});
