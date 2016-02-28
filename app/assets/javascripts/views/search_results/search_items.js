GoodgamesApp.Views.SearchItem = Backbone.View.extend({

  template: JST['search_results/item'],

  events: {
    'click .game-search-results': 'toShow'
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);
    return this;
  },

  toShow: function (event) {
    event.preventDefault();
    var game = new GoodgamesApp.Models.Game();
    if (GoodgamesApp.games.where({ id: this.model.id }).length) {
      game.set({ id: this.model.id });
    }

    this.mimicLoad();
    var attrs = this.model.getAttributes();
    game.set(attrs);
    game.save({}, {
      success: function () {
        GoodgamesApp.games.add(game, { merge: true });
        Backbone.history.navigate('games/' + game.id, { trigger: true });
      }
    });
  },

  mimicLoad: function () {
    $('#search-results-page').addClass('display-none');
  }
});
