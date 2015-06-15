GoodgamesApp.Views.ResultItem = Backbone.View.extend({

  template: JST['search_results/user_item'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});
