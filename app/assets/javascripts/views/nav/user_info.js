GoodgamesApp.Views.UserInfo = Backbone.CompositeView.extend({
  template: JST['nav/user_info'],

  tagName: 'li',

  className: 'nav navbar-nav navbar-right',

  initialize: function() {
    this.listenTo(GoodgamesApp.currentUser, 'sync', this.render);
    this.listenTo(GoodgamesApp.currentUser.image(), 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template);

    return this;
  },
});
