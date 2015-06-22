GoodgamesApp.Views.CollectionFeed = Backbone.CompositeView.extend({
  template: JST['collections/feed'],

  initialize: function () {
    this.users = new GoodgamesApp.Collections.Users();

    this.recommendations = new GoodgamesApp.Collections.RecommendationFeeds();
    this.users.fetch({
      success: function () {
        this.recommendations.fetch();
      }.bind(this)
    });

    this.listenTo(this.recommendations, 'add', this.addRecommendation);
    this.listenTo(this.recommendations, 'sync', this.render);
  },

  addRecommendation: function (recommendation) {
    var user = this.users.get(recommendation.escape('user_id'));
    var recView = new GoodgamesApp.Views.CollectionFeedItem({ model: recommendation, user: user });
    this.addSubview('#rec-feed', recView);
  },

  render: function () {
    this.$el.html(this.template);

    this.attachSubviews();

    return this;
  }
});
