GoodgamesApp.Collections.GameReviews = Backbone.Collection.extend({

  model: GoodgamesApp.Models.GameReview,

  url: '/game_reviews',

  parse: function (response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    return response.models;
  }

});
