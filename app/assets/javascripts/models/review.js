GoodgamesApp.Models.Review = Backbone.Model.extend({

  urlRoot: 'api/reviews',

  updateUserReviewCount: function() {
    var user = new GoodgamesApp.Collections.Users();
    user.getOrFetch(this.get('user_id'), function(user) {
      var newCount = user.get('review_count') + 1;
      user.set({ 'review_count': newCount });
      user.save();
    });
  }
});
