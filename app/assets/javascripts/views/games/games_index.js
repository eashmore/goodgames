GoodgamesApp.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function (options) {
    this.currentUser = options.currentUser;
    this.listenTo(this.collection, 'sync', this.render);
    this.addFeed();
    // this.listenTo(this.collection, 'add', this.addGames);

  },

  // addGame: function (game) {
  //   var gameView = new GoodgamesApp.Views.GameItem({ model: game });
  //   this.addSubview('#game-index', gameView);
  // },

  addGames: function () {
    var popular = [36765, 36113, 46569, 35573, 24024];
    var newReleases = [41484, 45577, 46582, 47342, 49073];
    var highestRated = [26839, 22420, 1539, 15473, 2600];
    var classics = [12572, 10299, 18115, 8307, 8870];

    this.addGame(popular, '#popular');
    this.addGame(newReleases, '#new');
    this.addGame(highestRated, '#best');
    this.addGame(classics, '#old');
  },

  addGame: function (array, index) {
    array.forEach(function (game_id) {
      var game = GoodgamesApp.games.where({ id: game_id })[0];
      // debugger;
      var gameView = new GoodgamesApp.Views.GameItem({ model: game });
      this.addSubview(index, gameView);
    }.bind(this));
  },

  addFeed: function () {
    var recFeedView = new GoodgamesApp.Views.CollectionFeed();
    this.addSubview('#rec-feed-index', recFeedView);

  },

  render: function () {
    // this.collection.each(this.addGames.bind(this));
    this.addGames();

    var content = this.template();
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }

});
