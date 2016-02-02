GoodgamesApp.Views.CollectionFeed = Backbone.CompositeView.extend({
  template: JST['collections/feed'],

  initialize: function () {
    this.recommendations = new GoodgamesApp.Collections.RecommendationFeeds();
    this.recommendations.fetch();

    this.listenTo(this.recommendations, 'add', this.addRecommendation);
    this.listenTo(this.recommendations, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();
    return this;
  },

  addRecommendation: function (recommendation) {
    var recView = new GoodgamesApp.Views.CollectionFeedItem({
      model: recommendation
    });
    this.addSubview('.feed-list', recView);
  }
});
