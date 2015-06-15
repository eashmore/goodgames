GoodgamesApp.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST['users/index'],

  initialize: function () {
    this.collection.fetch({
      success: function() {
        this.collection = this.collection.sortBy(function (model) {
          return -model.reviews().length;
        });
        this.collection.slice(0, 20).forEach(this.addUser.bind(this));
      }.bind(this)
    });
    this.listenTo(this.collection, 'sync', this.render);
  },

  addUser: function (user) {
    var userView = new GoodgamesApp.Views.UserItem({ model: user });
    this.addSubview('#user-list', userView);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();

    return this;
  }
});
