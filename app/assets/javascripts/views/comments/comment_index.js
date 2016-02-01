GoodgamesApp.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comments/index'],

  initialize: function (options) {
    this.user = options.user;
    this.comments = new GoodgamesApp.Collections.UserComments();

    this.comments.fetch({
      data: { page: 1,
              user_id: this.user.id
            }
    });

    this.addForm();

    this.listenTo(this.comments, 'sync', this.attachComments);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();
    this.listenForScroll.call(this);

    return this;
  },

  attachComments: function() {
    this.listenTo(this.user.comments(), 'add', this.addNewComment);
    
    this.comments.each(this.addComment.bind(this));
    this.render();
  },

  addComment: function (comment) {
    var commentView = new GoodgamesApp.Views.CommentItem({ model: comment });
    this.addSubview('.comment-list', commentView);
  },

  addNewComment: function (comment) {
    var commentView = new GoodgamesApp.Views.CommentItem({ model: comment });
    this.addSubview('.comment-list', commentView, 'prepend');
    this.render();
  },

  addForm: function () {
    var formView = new GoodgamesApp.Views.CommentForm({
      comments: this.comments,
      user: this.user
    });
    this.addSubview('.comment-form', formView);
  },

  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if (
      $(window).scrollTop() > $(document).height() - $(window).height() - 50
    ) {
      if (view.comments.page < view.comments.total_pages) {
        view.comments.fetch({
          data: { page: parseInt(view.comments.page) + 1,
                  user_id: view.user.id
                },
          remove: false,
        });
      }
    }
  }
});
