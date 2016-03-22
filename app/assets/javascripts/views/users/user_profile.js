GoodgamesApp.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/profile'],

  templateShow: JST['users/show'],

  events: {
    'click .upload-pic': 'uploadPic',
    'click .see-reviews': 'addReviewIndex'
  },

  initialize: function (options) {
    window.scrollTo(0, 0);
    this.currentUser = options.currentUser;
    this.userCollection = new GoodgamesApp.Collections.Collections();
    this.userCollection.fetch();
    this.userWishlist = new GoodgamesApp.Collections.Wishlists();
    this.userWishlist.fetch();

    this.addCommentsIndex();
    this.addPic();

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.ownedGames(), 'add', this.addOwnedGame);
    this.listenTo(this.model.wishlistGames(), 'add', this.addWishlistGame);

    this.model.ownedGames().each(this.addOwnedGame.bind(this));
    this.model.wishlistGames().each(this.addWishlistGame.bind(this));
  },

  render: function () {
    var revs = this.model.reviews().where({ commentable_type: 'Game'});
    for(var i = 0; i < revs.length; i++) {
      console.log(revs[i].get('commentable_id'));
    }

    var content = this.chooseTemplate();
    this.$el.html(content);
    if (this.model.rank().id){
      this.addRank();
    }
    this.checkLists();
    this.attachSubviews();
    this.slickSlider();
  },

  chooseTemplate: function () {
    if (this.model === this.currentUser) {
      $('.nav-profile.nav-tab').addClass('active');
      return this.template({ user: this.model });
    } else {
      return this.templateShow({ user: this.model });
    }
  },

  checkLists: function () {
    if (!this.model.ownedGames().length) {
      this.$el.find('.recommendations').html("No games have been recommended!");
    }
    if (!this.model.wishlistGames().length) {
      this.$el.find('.wishlist').html("This wishlist is empty!");
    }
  },

  addOwnedGame: function (game) {
    var collectionView = new GoodgamesApp.Views.CollectionItem({
      user: this.model,
      collection: this.userCollection,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('.recommendations', collectionView);
  },

  addWishlistGame: function (game) {
    var wishlistView = new GoodgamesApp.Views.WishlistItem({
      user: this.model,
      collection: this.userWishlist,
      model: game,
      currentUser: this.currentUser
    });
    this.addSubview('.wishlist', wishlistView);
  },

  addCommentsIndex: function () {
    var commentView = new GoodgamesApp.Views.CommentIndex({ user: this.model });
    this.addSubview('.comment-index', commentView);
  },

  addPic: function () {
    var picView = new GoodgamesApp.Views.ImagesShow({ model: this.model });
    this.addSubview('.profile-pic', picView);
  },

  uploadPic: function (event){
    event.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result){
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

    if (this.model.reviews().length) {
      $('body').prepend(reviewsView.render().$el);
    }
  },

  addRank: function () {
    var rankView = new GoodgamesApp.Views.Rank({
      model: this.model.rank(),
      user: this.model
    });
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
