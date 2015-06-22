GoodgamesApp.Views.Loading = Backbone.View.extend({
  template: JST['search_results/loading'],

  render: function () {
    this.$el.html(this.template);

    return this;
  }
});
