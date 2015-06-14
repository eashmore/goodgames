GoodgamesApp.Views.CollectionFeed = Backbone.CompositeView.extend({
  template: JST['collections/feed'],

  initialize: function () {
    this.recommendations = new GoodgamesApp.Collections.Collections();
    this.recommendations.fetch();
    this.listenTo(this.recommendations, 'sync', this.render);
    this.listenTo(this.recommendations, 'add', this.addRecommendation);
    this.listenTo(this.recommendations, 'add', this.removeLast);

    // this.recommendations.each(this.addRecommendation.bind(this));

  },

  addRecommendation: function (recommendation) {
    var recView = new GoodgamesApp.Views.CollectionFeedItem({ model: recommendation });
    this.addSubview('#rec-feed', recView, 'prepend');
  },

  render: function () {
    this.$el.html(this.template);

    this.attachSubviews();

    return this;
  }
});