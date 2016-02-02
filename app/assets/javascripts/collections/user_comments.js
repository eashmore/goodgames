GoodgamesApp.Collections.UserComments = Backbone.Collection.extend({

  model: GoodgamesApp.Models.UserComment,

  url: '/user_comments',

  parse: function (response) {
    this.page = response.page;
    this.total_pages = response.total_pages;
    return response.models;
  }

});
