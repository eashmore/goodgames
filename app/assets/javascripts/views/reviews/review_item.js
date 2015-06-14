GoodgamesApp.Views.ReviewItem = Backbone.View.extend({
  template: JST['reviews/item'],

  events: {
    'click #edit-review': 'edit',
    'click #username': 'toProfile'
  },

  render: function () {
    var content = this.template({ review: this.model });
    this.$el.html(content);

    this.$el.find("#given-score").rating();

    return this;
  },

  edit: function (event) {
    event.preventDefault();
  },

  toProfile: function (event) {
    event.preventDefault();
    Backbone.history.navigate('users/' + this.model.escape('user_id'), { trigger: true });
  }
});
