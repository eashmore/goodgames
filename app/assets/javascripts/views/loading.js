GoodgamesApp.Views.Loading = Backbone.View.extend({
  template: JST['loading'],

  render: function () {
    this.$el.html(this.template);

    return this;
  }
});
