GoodgamesApp.Views.Rank = Backbone.View.extend({

  template: JST['ranks/rank'],

  initialize: function (options) {
    var user = options.user;
    this.numReviews = user.reviews().where({ commentable_type: 'Game' }).length;
  },

  render: function () {
    var content = this.template({ rank: this.model, numRevs: this.numReviews });
    this.$el.html(content);

    return this;
  }

});
