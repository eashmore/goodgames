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
  }
});
