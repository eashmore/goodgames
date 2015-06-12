GoodgamesApp.Views.ReviewForm = Backbone.View.extend({
  tagName: 'form',

  template: JST['reviews/form'],

  events: {
    'click button': 'submit'
  },

  initialize: function(options) {
    this.game = options.game;
  },

  render: function () {
    var content = this.template({ game_id: this.game.id });
    this.$el.html(content);

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    this.model.set(attrs);
    this.model.save([], {
      success: function () {
        this.collection.unshift(this.model);
        this.render();
      }.bind(this)
    });
  }
});
