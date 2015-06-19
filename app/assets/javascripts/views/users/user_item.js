GoodgamesApp.Views.UserItem = Backbone.CompositeView.extend({
  template: JST['users/item'],

  events: {
    'click #to-user': 'toUser'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.ownedGames(), 'add', this.addRec);
    this.model.ownedGames().slice(0,4).forEach(this.addRec.bind(this));
  },

  addRec: function (game) {
    var recView = new GoodgamesApp.Views.CollectionItem({
      user: this.model,
      // collection: this.model.ownedGames(),
      model: game,
    });
    this.addSubview('#recs', recView);
  },

  render: function () {
    var numberOfReviews = this.model.reviews().where({ commentable_type: 'Game' }).length;
    var content = this.template({ user: this.model, numberOfReviews: numberOfReviews });
    this.$el.html(content);

    this.attachSubviews();

    return this;
  },

  toUser: function (event) {
    event.preventDefault();
    Backbone.history.navigate('/users/' + this.model.id, { trigger: true });
  }
});
