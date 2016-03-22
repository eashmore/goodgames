GoodgamesApp.Collections.Games = Backbone.Collection.extend({

  model: GoodgamesApp.Models.Game,

  url: 'api/games',

  getOrFetch: function (id) {
    var games = this;
    var game = games.get(id);
    if (!game) {
      game = new GoodgamesApp.Models.Game({ id: id });
      games.add(game);
      game.fetch({
        error: function () { games.remove(game); }
      });
    } else {
      game.fetch();
    }

    return game;
  }
});
