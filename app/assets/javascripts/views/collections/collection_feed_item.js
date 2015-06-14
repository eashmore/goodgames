GoodgamesApp.Views.CollectionFeedItem = Backbone.View.extend({

  template: JST['collections/feed_item'],

  events: {
    "click #feed-username": 'toUser',
    "click #feed-gamename": "toGame"
  },

  render: function () {
    var user = this.model.user_name;
    var game = this.model.game_name;
    var content = this.template({ recommendation: this.model });
    this.$el.html(content);

    return this;
  },

  toUser: function(event) {
    event.preventDefault();
    Backbone.history.navigate("/users/" + this.model.escape('user_id'),
      { trigger: true }
    );
  },

  toGame: function (event) {
    event.preventDefault();
    Backbone.history.navigate("/games/" + this.model.escape('game_id'),
      { trigger: true }
    );

  }
});
