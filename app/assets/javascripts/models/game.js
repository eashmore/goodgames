GoodgamesApp.Models.Game = Backbone.Model.extend({
  urlRoot: 'api/games',

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
  },

  updateScore: function () {
    var totalPoints = 0;
    this.reviews().each(function (review) {
      totalPoints += review.get('score');
    });
    var reviewCount = this.reviews().length;
    var averageScore = Math.round(totalPoints/reviewCount * 100) / 100;
    this.set('score', averageScore);
    this.save({'score': averageScore}, {patch: true});
  },
});
