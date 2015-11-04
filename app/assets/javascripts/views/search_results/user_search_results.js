GoodgamesApp.Views.UserSearchResults = Backbone.CompositeView.extend({

  template: JST['search_results/user_results'],

  initialize: function () {
    this.collection.forEach(this.addResults.bind(this));
  },

  addResults: function (result) {
    var resultsView = new GoodgamesApp.Views.UserItem({ model: result });
    this.addSubview('.user-results', resultsView);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();

    return this;
  }
});
