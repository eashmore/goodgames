GoodgamesApp.Models.Review = Backbone.Model.extend({

  urlRoot: 'api/reviews',

  updateUserReviewCount: function() {
    var user = new GoodgamesApp.Models.User({ id: this.get('user_id') });
    user.fetch({
      success: function() {
        var newCount = user.get('review_count') + 1;
        user.set({ 'review_count': newCount });
        user.save();
      }
    });
  }
});
