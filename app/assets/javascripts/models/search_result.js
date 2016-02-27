GoodgamesApp.Models.SearchResult = Backbone.Model.extend({
  getAttributes: function () {
    var platforms = this.parsePlatforms();
    var attrs = {
      game: {
        id: this.get('id'),
        name: this.get('name'),
        deck: this.get('deck'),
        boxart_url: this.get('image').small_url,
        release_date: this.get('original_release_date') ?
          this.get('original_release_date').slice(0, 10) :
          this.get('expected_release_year'),
        platforms: platforms
      }
    };
    return attrs;
  },

  parsePlatforms: function () {
    var platforms = '';
    this.get('platforms').forEach(function (platform) {
      platforms += platform.name + '@@@';
    });
    return platforms;
  },
});
