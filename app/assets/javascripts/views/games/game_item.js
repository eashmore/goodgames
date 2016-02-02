GoodgamesApp.Views.GameItem = Backbone.View.extend({

  template: JST['games/index_item'],

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);

    this.$el.find(".average-score").rating();

    return this;
  }
});
