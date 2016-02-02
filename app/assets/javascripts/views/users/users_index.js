GoodgamesApp.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST['users/index'],

  initialize: function () {
    $('.nav-users').addClass("active");
    this.collection.fetch({
      success: function () {
        this.findTopUsers();
        this.collection.slice(0, 10).forEach(this.addUser.bind(this));
      }.bind(this)
    });
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();
    return this;
  },

  addUser: function (user) {
    var userView = new GoodgamesApp.Views.UserItem({ model: user });
    this.addSubview('#top-submitter-list', userView);
  },

  findTopUsers: function() {
    this.collection = this.collection.sortBy(function (model) {
      return -model.reviews().where({ commentable_type: 'Game' }).length;
    });
  }
});
