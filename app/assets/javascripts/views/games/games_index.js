GoodgamesApp.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    // this.listenTo(this.collection, 'add', this.addGames);

  },

  // addGame: function (game) {
  //   var gameView = new GoodgamesApp.Views.GameItem({ model: game });
  //   this.addSubview('#game-index', gameView);
  // },

  addGames: function () {
    this.addGame(0, 6, '#popular');
    this.addGame(6, 12, '#new');
    this.addGame(12, 18, '#best');
    this.addGame(18, 24, '#old');
  },

  addGame: function (start, end, index) {
    this.collection.slice(start, end).forEach(function (game) {
      var gameView = new GoodgamesApp.Views.GameItem({ model: game });
      this.addSubview(index, gameView);
    }.bind(this));
  },

  render: function () {
    // debugger;
    // this.collection.each(this.addGames.bind(this));
    this.addGames();

    var content = this.template();
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }

});
