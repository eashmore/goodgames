GoodgamesApp.Models.Game = Backbone.Model.extend({
  urlRoot: '/games',

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new GoodgamesApp.Collections.Reviews([], { game: this });
    }

    return this._reviews;
  },

  parse: function (response) {
    var averageScore = null;
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });

      var reviewCount = 0;
      var totalPoints = 0;
      response.reviews.forEach(function (review) {
        totalPoints += review.score;
        reviewCount += 1;
      });

      averageScore = Math.round(totalPoints/reviewCount * 100) / 100;

      delete response.reviews;
    }
    if (!averageScore) {
      averageScore = 0;
    }
    response.score = averageScore;
    return response;
  }
});
