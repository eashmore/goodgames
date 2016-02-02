GoodgamesApp.Views.SearchItem = Backbone.View.extend({

  template: JST['search_results/item'],

  events: {
    'click .game-search-results': 'toShow'
  },

  render: function () {
    var content = this.template({ game: this.model });
    this.$el.html(content);

    return this;
  },

  toShow: function (event) {
    event.preventDefault();
    var game = new GoodgamesApp.Models.Game();
    if (GoodgamesApp.games.where({ id: this.model.id }).length) {
      game.set({ id: this.model.id });
    }

    this.mimicLoad();
    game.set(this.getAttributes(game));
    game.save({}, {
      success: function () {
        GoodgamesApp.games.add(game, { merge: true });
        Backbone.history.navigate('games/' + game.id, { trigger: true });
      }
    });
  },

  getAttributes: function (game) {
    var platforms = this.parsePlatforms();
    var attrs = {
      game: { id: this.model.get('id'),
              name: this.model.get('name'),
              deck: this.model.get('deck'),
              boxart_url: this.model.get('image').small_url,
              release_date: this.model.get('original_release_date') ?
                this.model.get('original_release_date').slice(0, 10) :
                this.model.get('expected_release_year'),
              platforms: platforms
            }
    };

    return attrs;
  },

  parsePlatforms: function () {
    var platforms = "";
    this.model.get('platforms').forEach(function (platform) {
      platforms += platform.name + "@@@";
    });

    return platforms;
  },

  mimicLoad: function () {
    $('.search-results-page').css('visibility', 'hidden');
  }
});
