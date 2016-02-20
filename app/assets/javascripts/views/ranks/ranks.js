GoodgamesApp.Views.Rank = Backbone.View.extend({

  template: JST['ranks/rank'],

  initialize: function (options) {
    this.user = options.user;
  },

  render: function () {
    var content = this.template({
      rank: this.model,
      user: this.user
    });
    this.$el.html(content);
    return this;
  }
});
