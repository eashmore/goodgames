GoodgamesApp.Views.ReviewItem = Backbone.View.extend({
  template: JST['reviews/item'],

  events: {
    'click #edit-review': 'edit',
    'click #username': 'toProfile',
    'click #game-name': 'toGame'
  },

  initialize: function () {
    this.game = GoodgamesApp.games.get(this.model.get('commentable_id'));
  },

  render: function () {
    var content = this.template({ review: this.model, game: this.game });
    this.$el.html(content);

    this.$el.find("#given-score").rating();

    return this;
  },

  edit: function (event) {
    event.preventDefault();
  },

  toProfile: function (event) {
    event.preventDefault();
    Backbone.history.navigate('users/' + this.model.escape('user_id'),
      { trigger: true }
    );
  },

  toGame: function (event) {
    event.preventDefault();
    $('.review-profile-index').remove();
    Backbone.history.navigate('games/' + this.game.id,
      { trigger: true }
    );
  }
});
