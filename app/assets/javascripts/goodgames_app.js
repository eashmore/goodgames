// giantbomb api key: 3237292f5c8790f3237e3aa779cc19b3edbf1cdb

window.GoodgamesApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#main");
    var router = new GoodgamesApp.Routers.Router( { $rootEl: $rootEl });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  GoodgamesApp.initialize();
});
