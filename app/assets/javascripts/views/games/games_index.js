GoodgamesApp.Views.GamesIndex = Backbone.CompositeView.extend({

  template: JST['games/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addGame);
    this.collection.each(this.addGame.bind(this));
  },

  addGame: function (game) {
    var gameView = new GoodgamesApp.Views.GameItem({ model: game });
    this.addSubview('#game-index', gameView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }

});
