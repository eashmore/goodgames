GoodgamesApp.Collections.SearchResults = Backbone.Collection.extend({

  model: GoodgamesApp.Models.SearchResult,

  parse: function (payload) {
    return payload.results;
  }

});
