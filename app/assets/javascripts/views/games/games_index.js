GoodgamesApp.Views.GamesIndex = Backbone.View.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    debugger;
    if (this.collection.length) {
    var content = this.template({ games: this.collection.models[0].attributes.results });
    this.$el.html(content);
  }
    return this;
  }

});
