GoodgamesApp.Models.User = Backbone.Model.extend({

  urlRoot: '/users',

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new GoodgamesApp.Collections.Reviews([], { user: this });
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
