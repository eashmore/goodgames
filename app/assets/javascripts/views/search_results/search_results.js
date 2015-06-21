GoodgamesApp.Views.SearchResults = Backbone.CompositeView.extend({

  template: JST['search_results/index'],

  initialize: function (options) {
    this.query = options.query;
    this.listenTo(this.searchResults, 'reset', this.removeSubs);

  },

  addResult: function () {
    this.searchResults.each(function (item) {

      var itemView = new GoodgamesApp.Views.SearchItem({ model: item });
      this.addSubview('#results', itemView);
    }.bind(this));
  },

  removeSubs: function () {
    this.$el.find('#results').html('');
  },

  render: function () {
    var loadingView = new GoodgamesApp.Views.Loading();
    this.$el.html(loadingView.render().$el);
    this.searchResults = new GoodgamesApp.Collections.SearchResults();

    this.searchResults.fetch({
      url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
           "&format=jsonp&query=" + this.query + "&resources=game&limit=35",
      dataType: 'jsonp',
      jsonpCallback: 'json_callback',
      contentType: "application/json",
      jsonp: 'json_callback',
      success: function () {
        this.$el.find('.loading-screen').remove();
        this.showResults();
      }.bind(this)
    });
  },



  showResults: function () {
    var content = this.template({ results: this.searchResults });
    this.$el.html(content);
    this.addResult();
    this.attachSubviews();

    return this;
  }

});
