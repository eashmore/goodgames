GoodgamesApp.Views.ReviewForm = Backbone.View.extend({
  tagName: 'form',

  template: JST['reviews/form'],

  events: {
    'click .close': 'remove',
    'click .m-backdrop': 'remove',
    'click .compose': 'submit'
  },

  initialize: function(options) {
    this.game = options.game;
  },

  render: function () {
    var content = this.template({ game_id: this.game.id });
    this.$el.html(content);

    this.$el.find("#review-score").rating();

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        this.setRank();
        this.remove();
      }.bind(this),
      error: function (model, response) {
        this.$el.find('.errors').html(response.responseText.slice(1,-1).split(',').join('<br>'));
      }.bind(this)
    });
  },

  setRank: function () {
    var numReviews = GoodgamesApp.currentUser.reviews().where({
      commentable_type: 'Game'
    }).length + 1;
    ranks = new GoodgamesApp.Collections.Ranks();
    ranks.fetch({
      success: function () {
        ranks.slice(1).forEach(function(rank) {
          if (numReviews >= rank.escape('score')) {
            GoodgamesApp.currentUser.set({ rank_id: rank.id });
            GoodgamesApp.currentUser.save();
          }
        });
      }.bind(this)
    });
  }
});
