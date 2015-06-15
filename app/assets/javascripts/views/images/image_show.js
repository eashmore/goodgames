GoodgamesApp.Views.ImagesShow = Backbone.View.extend({
  template: JST['images/show'],

  events: {
    'click .upload-pic': 'upload'
  },

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    debugger;
    this.$el.html(this.template({ image: this.model.image() }));
    return this;
  },

  upload: function(event){
    var image = this.model;
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      image.set({url: data.url, thumb_url: data.thumbnail_url});
      image.save();
    });
  },
});
