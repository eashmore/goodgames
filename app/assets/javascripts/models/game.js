GoodgamesApp.Models.Game = Backbone.Model.extend({
  urlRoot: '/games',

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new GoodgamesApp.Collections.Reviews([], { game: this });
    }

    return this._reviews;
  },

  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }

    return response;
  }
});
