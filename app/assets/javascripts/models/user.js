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

  comments: function () {
    if (!this._comments) {
      this._comments = new GoodgamesApp.Collections.Reviews([], { user: this });
    }

    return this._comments;
  },

  image: function () {
    if (!this._image) {
      this._image = new GoodgamesApp.Models.Image([], { user: this });
    }

    return this._image;
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

    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.image) {
      this.image().set(response.image, { parse: true });
      delete response.image;
    } else {
      this.image().set({
        url: "assets/user.png",
        thumb_url: "assets/user.png",
        user_id: response.id
      }, {parse: true });
      delete response.image;
    }

    return response;
  }

});
