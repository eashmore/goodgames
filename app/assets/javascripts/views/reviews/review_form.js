GoodgamesApp.Views.ReviewForm = Backbone.View.extend({
  tagName: 'form',

  template: JST['reviews/form'],

  events: {
    'click .close': 'remove',
    'click .m-backdrop': 'remove',
    'click button': 'submit'
  },

  initialize: function (options) {
    this.game = options.game;
  },

  render: function () {
    var content = this.template({ review: this.model, game_id: this.game.id });
    this.$el.html(content);

    this.$el.find(".review-score").rating();

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = this.$el.serializeJSON();
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        this.game.reviews().add(this.model);
        this.remove();
      }.bind(this),
      error: function (model, response) {
        this.$el.find('.errors').html(
          response.responseText.slice(1, -1).split(',').join('<br>')
        );
      }.bind(this)
    });
  },

});
