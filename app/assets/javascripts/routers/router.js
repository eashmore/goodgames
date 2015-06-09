GoodgamesApp.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new GoodgamesApp.Collections.Games();
    this.collection.fetch();
  },

  routes: {
    '': 'index'
  },

  index: function () {
    var indexView = new GoodgamesApp.Views.GamesIndex({ collection: this.collection });
    this._swapView(indexView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
