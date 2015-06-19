GoodgamesApp.Views.Rank = Backbone.View.extend({

  template: JST['ranks/rank'],

  render: function () {
    var content = this.template({ rank: this.model });
    this.$el.html(content);

    return this;
  }

});
