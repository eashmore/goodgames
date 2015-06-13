GoodgamesApp.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new GoodgamesApp.Collections.Reviews([], { user: this });
    }

    return this._reviews;
  },

  ownedGames: function () {
    if (!this._ownedGames) {
      this._ownedGames = new GoodgamesApp.Collections.Games([], { user: this });
    }

    return this._ownedGames;
  },

  wishlistGames: function () {
    if (!this._wishlistGames) {
      this._wishlistGames = new GoodgamesApp.Collections.Games([], { user: this });
    }

    return this._wishlistGames;
  },

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }

    if (response.owned_games) {
      this.ownedGames().set(response.owned_games, { parse: true });
      delete response.owned_games;
    }

    if (response.wishlist_games) {
      this.wishlistGames().set(response.wishlist_games, { parse: true });
      delete response.wishlist_games;
    }

    return response;
  }

});
