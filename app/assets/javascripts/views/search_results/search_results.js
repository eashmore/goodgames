GoodgamesApp.Views.SearchResults = Backbone.CompositeView.extend({

  template: JST['search_results/index'],

  initialize: function () {
    // this.listenTo(this.collection, 'add', this.render);
    // this.listenTo(this.collection, 'add', this.addResult);
    this.listenTo(this.collection, 'reset', this.removeSubs);

    this.collection.each(this.addResult.bind(this));
  },

  addResult: function (item) {
    var itemView = new GoodgamesApp.Views.SearchItem({ model: item });
    this.addSubview('#results', itemView);
  },

  removeSubs: function () {
    this.$el.find('#results').html('');
  },

  render: function () {
    var content = this.template({ results: this.collection });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }

});
