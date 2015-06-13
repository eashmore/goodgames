GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    var collectionView = new GoodgamesApp.Views.CollectionsIndex({ currentUser: this.model, collection: this.model.ownedGames() }); // TA: CompositeView. do you use it?
    this.$el.find('#collection').html(collectionView.render().$el);

    return this;
  }
});
