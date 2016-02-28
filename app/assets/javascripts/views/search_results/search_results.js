GoodgamesApp.Views.SearchResults = Backbone.CompositeView.extend({

  template: JST['search_results/index'],

  initialize: function (options) {
    this.query = options.query;
    this.searchResults = new GoodgamesApp.Collections.SearchResults();
    this.getSearchResults();
  },

  render: function () {
    var content = this.template({ results: this.searchResults, query: this.query });
    this.$el.html(content);
  },

  addResult: function () {
    this.searchResults.each(function (item) {
      var itemView = new GoodgamesApp.Views.SearchItem({ model: item });
      this.addSubview('.search-results', itemView);
    }.bind(this));
  },

  getSearchResults: function () {
    this.searchResults.fetch({
      url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
           "&format=jsonp&query=" + this.query + "&resources=game&limit=35",
      dataType: 'jsonp',
      jsonpCallback: 'json_callback',
      contentType: "application/json",
      jsonp: 'json_callback',
      success: function () {
        this.removeLoadingScreen();
        this.showResults();
      }.bind(this)
    });
  },

  removeLoadingScreen: function () {
    this.$el.find('#loading-screen').addClass('display-none');
    this.$el.find('#results').removeClass('display-none');
    if (!this.searchResults.length) {
      this.$el.find('#no-results').html('No results found');
    }
  },

  showResults: function () {
    this.addResult();
    this.attachSubviews();
  }
});
