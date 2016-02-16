GoodgamesApp.Views.UserInfo = Backbone.CompositeView.extend({
  template: JST['nav/user_info'],

  tagName: 'li',

  className: 'nav navbar-nav navbar-right',

  events: {
    'click .logout' : 'endSession'
  },

  initialize: function () {
    this.listenTo(GoodgamesApp.currentUser, 'sync', this.render);
    this.listenTo(GoodgamesApp.currentUser.image(), 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template);
    return this;
  },

  endSession: function (event) {
    event.preventDefault();
    $.ajax({
      url: '/session',
      type: 'DELETE',
      async: false,
      success: window.location.reload()
    });
  }
});
