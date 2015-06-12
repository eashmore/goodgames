GoodgamesApp.Views.CollectionItem = Backbone.View.extend({

  template: JST['collections/item'],

  events: {
    'click #delete-item': "deleteGame"
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);

    return this;
  },

  deleteGame: function (event) {
    event.preventDefault();
    this.collection.remove(this.model);
    this.collection.fetch({
      success: function () {
        this.remove();
      }
    });
  }
});
