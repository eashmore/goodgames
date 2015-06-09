GoodgamesApp.Collections.Games = Backbone.Collection.extend({

  model: GoodgamesApp.Models.Game,

  url: 'http://www.giantbomb.com/api/games/?api_key=3237292f5c8790f3237e3aa779cc19b3edbf1cdb&format=json&sort=number_of_user_reviews',

  getOrfetch: function () {
    var game = this.get(id),
      games = this;
    if (!game) {
      game = new TrelloClone.Models.Card({ id: id });
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
