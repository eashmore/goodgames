GoodgamesApp.Views.SearchResults = Backbone.CompositeView.extend({

  template: JST['search_results/index'],

  initialize: function (options) {
    // this.listenTo(this.searchResults, 'add', this.render);
    // this.listenTo(this.searchResults, 'add', this.addResult);
    this.query = options.query;
    // this.listenTo(this.searchResults, 'change sync add', this.addResult);
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
    // debugger;
    var content = this.template({ results: this.searchResults });
    this.$el.html(content);
    this.addResult();
    this.attachSubviews();

    return this;
  }

});




// var loadingView = new GoodgamesApp.Views.Loading();
// this._swapView(loadingView);
// var searchResults = new GoodgamesApp.Collections.SearchResults();
// searchResults.fetch({
//   url: "http://www.giantbomb.com/api/search/?api_key=" + GIANTBOMB.api_key +
//        "&format=jsonp&query=" + query + "&resources=game&limit=35",
//   dataType: 'jsonp',
//   jsonpCallback: 'json_callback',
//   contentType: "application/json",
//   jsonp: 'json_callback',
//   success: function () {
//     var resultsView = new GoodgamesApp.Views.SearchResults({
//       searchResults: searchResults
//     });
//     this._swapView(resultsView);
//   }.bind(this)
// });
