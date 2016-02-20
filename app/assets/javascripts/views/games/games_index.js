GoodgamesApp.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  className: 'container-fluid',

  initialize: function (options) {
    $('.nav-games').addClass("active");
    this.currentUser = options.currentUser;
    this.listenTo(this.collection, 'sync', this.render);
    this.addFeed();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    if (this.collection.length) {
      this.addGames();
    }
    this.attachSubviews();
    return this;
  },

  addGames: function () {
    var popular = [36765, 36113, 46569, 35573, 24024];
    var newReleases = [41484, 45577, 46582, 47342, 49073];
    var classics = [12572, 10299, 18115, 8307, 8870];
    var highestRated = this.getHighestRated();
    this.addGame(popular, '#popular');
    this.addGame(newReleases, '#new');
    this.addGame(highestRated, '#best');
    this.addGame(classics, '#old');
  },

  addGame: function (array, index) {
    array.forEach(function (game_id) {
      var game = GoodgamesApp.games.where({ id: game_id })[0];
      var gameView = new GoodgamesApp.Views.GameItem({ model: game });
      this.addSubview(index, gameView);
    }.bind(this));
  },

  getHighestRated: function () {
    var highestRated = GoodgamesApp.games.slice(0, 5).map(function(game) {
      return game.get('id');
    });
    return highestRated;
  },

  addFeed: function () {
    var recFeedView = new GoodgamesApp.Views.CollectionFeed();
    this.addSubview('#recommendation-feed', recFeedView);
  }
});
