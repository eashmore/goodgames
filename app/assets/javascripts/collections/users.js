GoodgamesApp.Collections.Users = Backbone.Collection.extend({

  model: GoodgamesApp.Models.User,

  url: '/users',

  getOrFetch: function (id, fn) {
    var users = this;
    var user = this.get(id);
    if (!user) {
      user = new GoodgamesApp.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
          return typeof fn === 'function' ? fn(user) : user;
        },
      });
    } else {
      user.fetch();
      return typeof fn === 'function' ? fn(user) : user;
    }

    return user;
  }
});
