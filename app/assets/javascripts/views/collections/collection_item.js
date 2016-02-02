GoodgamesApp.Views.CollectionItem = Backbone.View.extend({

  template: JST['collections/item'],

  button: JST['collections/button'],

  events: {
    'click .remove-game': "removeGame"
  },

  initialize: function (options) {
    this.user = options.user;
    this.currentUser = options.currentUser;
  },

  render: function () {
    var content = this.template({ game: this.model });

    this.$el.html(content);

    if (this.currentUser && this.user.id === this.currentUser.id) {
      this.$el.find('.delete-button').html(this.button);
    }

    return this;
  },

  removeGame: function (event) {
    event.preventDefault();
    var currentCollection = this.collection.where({
      user_id: this.currentUser.id,
      game_id: this.model.id
    })[0];

    currentCollection.destroy({
      success: function () {
        this.currentUser.ownedGames().remove(this.model);
        this.remove();
      }.bind(this)
    });
  }
});
