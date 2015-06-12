GoodgamesApp.Views.CollectionsIndex = Backbone.CompositeView.extend({

  template: JST['collections/collection'],

  initialize: function (options) {
    this.user = options.user;
    // this.user.fetch();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addGame);
    this.collection.each(this.addGame.bind(this));
  },

  addGame: function (game) {
    var gameView = new GoodgamesApp.Views.CollectionItem({ model: game, collection: this.collection });
    this.addSubview('#coll-list', gameView, 'prepend');
  },

  render: function () {
    var content = this.template({ collection: this.collection });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }

});
