GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  templateShow: JST['users/show'],

  events: {
    'click .upload-pic': 'upload',
    'click .see-reviews': 'addReviewIndex'

  },

  initialize: function (options) {
    window.scrollTo(0,0);

    this.currentUser = options.currentUser;

    this.userCollection = new GoodgamesApp.Collections.Collections();
    this.userCollection.fetch();

    this.userWishlist = new GoodgamesApp.Collections.Wishlists();
    this.userWishlist.fetch();

    this.addCommentsIndex();
    this.addPic();

    if (this.model.rank().id){
      this.addRank();
    }
    this.listenTo(this.model, 'sync', this.addRank);

    this.listenTo(this.model, 'sync', this.render);


    this.listenTo(this.model.ownedGames(), 'add', this.addOwnedGame);
    this.model.ownedGames().each(this.addOwnedGame.bind(this));

    this.listenTo(this.model.wishlistGames(), 'add', this.addWishlistGame);
    this.model.wishlistGames().each(this.addWishlistGame.bind(this));
  },

  addOwnedGame: function (game) {
    var collectionView = new GoodgamesApp.Views.CollectionItem({
      user: this.model,
      collection: this.userCollection,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('.collection', collectionView);
  },

  addWishlistGame: function (game) {
    var wishlistView = new GoodgamesApp.Views.WishlistItem({
      user: this.model,
      collection: this.userWishlist,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('#wishlist', wishlistView);
  },

  addCommentsIndex: function () {
    var commentView = new GoodgamesApp.Views.CommentIndex({ user: this.model });
    this.addSubview('.comment-index', commentView);
  },

  addPic: function () {
    var picView = new GoodgamesApp.Views.ImagesShow({ model: this.model });
    this.addSubview('.profile-pic', picView);
  },

  render: function () {
    var content;
    if (this.model === this.currentUser) {
      content = this.template({ user: this.model });
    } else {
      content = this.templateShow({ user: this.model });
    }
    this.$el.html(content);

    this.attachSubviews();

    this.slickSlider();
  },

  upload: function(event){
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      this.model.image().set({url: data.url, thumb_url: data.thumbnail_url});
      this.model.image().save();
    }.bind(this));
  },

  addReviewIndex: function (event) {
    event.preventDefault();
    var reviewsView = new GoodgamesApp.Views.ReviewsProfile({
      collection: this.model.reviews().where({ commentable_type: 'Game'}),
    });
    $('body').prepend(reviewsView.render().$el);
  },

  addRank: function () {
    var rankView = new GoodgamesApp.Views.Rank({ model: this.model.rank(), user: this.model });
    this.addSubview('.rank', rankView);
  },

  slickSlider: function () {
    $('.slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 7,
      slidesToScroll: 7,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  },
});
