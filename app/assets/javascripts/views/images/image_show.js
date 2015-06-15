GoodgamesApp.Views.ImagesShow = Backbone.View.extend({
  template: JST['images/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.image(), "change", this.render);
  },

  render: function() {
    this.$el.html(this.template({ image: this.model.image() }));
    return this;
  }
});
