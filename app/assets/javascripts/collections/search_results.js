GoodgamesApp.Collections.SearchResults = Backbone.Collection.extend({

  model: GoodgamesApp.Models.SearchResult,

  parse: function (response) {
    return response.results;
  }

});
