GoodgamesApp.Views.CollectionFeed = Backbone.CompositeView.extend({
  template: JST['collections/feed'],

  initialize: function () {
    this.recommendations = new GoodgamesApp.Collections.Collections();
    this.users = new GoodgamesApp.Collections.Users();

    this.recommendations.fetch({
      success: function () {
        this.users.fetch();
      }.bind(this)
    });
    // this.listenTo(this.recommendations, 'sync', this.render);

    this.listenTo(this.users, 'sync', this.render);

    // this.listenTo(this.recommendations, 'add', this.addRecommendation);
    // this.listenTo(this.recommendations, 'add', this.removeLast);


  },

  addRecommendation: function (recommendation) {
    var user = this.users.get(recommendation.escape('user_id'));
    var recView = new GoodgamesApp.Views.CollectionFeedItem({ model: recommendation, user: user });
    this.addSubview('#rec-feed', recView, 'prepend');
  },

  render: function () {
    this.recommendations.slice(0,20).forEach(this.addRecommendation.bind(this));
    this.$el.html(this.template);

    this.attachSubviews();

    return this;
  }
});
