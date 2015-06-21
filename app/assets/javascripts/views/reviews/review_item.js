GoodgamesApp.Views.ReviewItem = Backbone.View.extend({
  template: JST['reviews/item'],

  events: {
    // 'click #edit-review': 'edit',
    'click #username': 'toProfile',
    'click #game-name': 'toGame',
    'click #edit-review': 'addForm'
  },

  initialize: function () {
    this.game = GoodgamesApp.games.get(this.model.get('commentable_id'));
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var content = this.template({ review: this.model, game: this.game });
    this.$el.html(content);

    this.$el.find("#given-score").rating();

    return this;
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
  },

  addForm: function (event) {
    event.preventDefault();
    var formView = new GoodgamesApp.Views.ReviewForm({
      model: this.model,
      collection: this.game.reviews(),
      game: this.game
    });

    $('body').prepend(formView.render().$el);
  },
});
