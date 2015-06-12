GoodgamesApp.Collections.Games = Backbone.Collection.extend({

  model: GoodgamesApp.Models.Game,

  url: '/games',

  getOrFetch: function (id) {
    var games = this;
    var game = this.get(id);
    if (!game) {
      game = new GoodgamesApp.Models.Game({ id: id });
      game.fetch({
        success: function () {
          games.add(game);
        },
      });
    } else {
      game.fetch();
    }
    return game;
  },

  comparator: function (game1, game2) {
    if (game1.get('created_at') < game2.get('created_at')) {
      return -1;
    }
    if (game2.get('created_at') > game1.get('created_at')) {
      return 1;
    }
    return 0;
  }
});
