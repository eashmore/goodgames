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

      var reviewCount = 0;
      var totalPoints = 0;
      response.reviews.forEach(function (review) {
        totalPoints += review.score;
        reviewCount += 1;
      });

      var averageScore = Math.round(totalPoints/reviewCount * 100) / 100;
      if (!averageScore) {
        averageScore = 0;
      }
      response.score = averageScore;


      delete response.reviews;
    }
    return response;
  }
});
