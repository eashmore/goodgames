GoodgamesApp.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function (options) {
    $('.nav-games').addClass("active");
    
    this.currentUser = options.currentUser;
    this.highestRated = [26839, 22420, 1539, 15473, 2600];
    this.listenTo(this.collection, 'sync', this.render);
    this.addFeed();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.addGames();
    this.attachSubviews();

    return this;
  },

  addGames: function () {
    var popular = [36765, 36113, 46569, 35573, 24024];
    var newReleases = [41484, 45577, 46582, 47342, 49073];
    var classics = [12572, 10299, 18115, 8307, 8870];
    if (GoodgamesApp.games.length) {
      var sortedGames = GoodgamesApp.games.sortBy(function (game) {
        return -game.escape('score');
      });
      this.highestRated = [];
      sortedGames.slice(0, 5).forEach(function (game) {
        this.highestRated.push(game.id);
      }.bind(this));
    }

    this.addGame(popular, '#popular');
    this.addGame(newReleases, '#new');
    this.addGame(this.highestRated, '#best');
    this.addGame(classics, '#old');
  },

  addGame: function (array, index) {
    array.forEach(function (game_id) {
      var game = GoodgamesApp.games.where({ id: game_id })[0];
      var gameView = new GoodgamesApp.Views.GameItem({ model: game });
      this.addSubview(index, gameView);
    }.bind(this));
  },

  addFeed: function () {
    var recFeedView = new GoodgamesApp.Views.CollectionFeed();
    this.addSubview('.rec-feed', recFeedView);
  }
});
