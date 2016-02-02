GoodgamesApp.Views.UserItem = Backbone.CompositeView.extend({
  template: JST['users/item'],

  events: {
    'click .username': 'toUser'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.model.ownedGames().slice(0,4).forEach(this.addRec.bind(this));
  },

  render: function () {
    var numberOfReviews = this.model.reviews().where({
      commentable_type: 'Game'
    }).length;
    var content = this.template({
      user: this.model,
      numberOfReviews: numberOfReviews
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addRec: function (game) {
    var recView = new GoodgamesApp.Views.CollectionItem({
      user: this.model,
      model: game,
    });
    this.addSubview('.card-recommendations', recView);
  },

  toUser: function (event) {
    event.preventDefault();
    Backbone.history.navigate('/users/' + this.model.id, { trigger: true });
  }
});
