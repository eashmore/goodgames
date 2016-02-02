GoodgamesApp.Collections.Reviews = Backbone.Collection.extend({

  model: GoodgamesApp.Models.Review,

  url: '/reviews',

  getOrFetch: function (id) {
    var reviews = this;
    var review = this.get(id);
    if (!review) {
      review = new GoodgamesApp.Models.Review({ id: id });
      review.fetch({
        success: function () {
          reviews.add(review);
        },
      });
    } else {
      review.fetch();
    }
    
    return review;
  }
});
