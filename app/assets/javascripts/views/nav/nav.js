GoodgamesApp.Views.Nav = Backbone.View.extend({

  template: JST['nav/nav'],

  events: {
    'click #profile': 'toProfile',
    'click #games-link': 'toGamesIndex'
  },

  initialize: function (options) {},

  render: function () {
    this.$el.html(this.template);
    var searchView = new GoodgamesApp.Views.SearchBar();
    this.$el.find('#search-bar').html(searchView.render().$el);

    return this;
  },

  toProfile: function (event) {
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $('#profile').addClass("active");
    Backbone.history.navigate('/user', { trigger: true });
  },

  toGamesIndex: function (event) {
    event.preventDefault();
    $(".nav").find(".active").removeClass("active");
    $('.games-link').addClass("active");
    Backbone.history.navigate('', { trigger: true });
  }
});
