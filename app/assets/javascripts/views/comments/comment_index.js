GoodgamesApp.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comments/index'],

  initialize: function (options) {
    this.user = options.user;

    this.comments = this.user.comments();

    this.addForm();

    this.listenTo(this.comments, 'change', this.render);
    this.listenTo(this.comments, 'add', this.addComment);
    this.comments.each(this.addComment.bind(this));
  },

  addComment: function (comment) {
    var commentView = new GoodgamesApp.Views.CommentItem({ model: comment });
    this.addSubview('.comment-list', commentView, 'prepend');
  },

  addForm: function () {
    var formView = new GoodgamesApp.Views.CommentForm({
      collection: this.user.comments(),
      user: this.user
    });
    this.addSubview('.comment-form', formView);
  },

  render: function () {
    this.$el.html(this.template);
    this.attachSubviews();

    return this;
  }
});
