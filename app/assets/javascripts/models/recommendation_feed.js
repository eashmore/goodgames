GoodgamesApp.Models.RecommendationFeed = Backbone.Model.extend({

  urlRoot: '/recommendation_feeds',

  image: function () {
    if (!this._image) {
      this._image = new GoodgamesApp.Models.Image([], { user: this });
    }

    return this._image;
  },

  parse: function (response) {
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
