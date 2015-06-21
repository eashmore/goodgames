$(function() {

  $('.autoplay0').slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    pauseOnHover: false,
  });
});

$(function() {

  $('.autoplay1').slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToShow: 7,
    slidesToScroll: -1,
    autoplay: true,
    autoplaySpeed: 1200,
    pauseOnHover: false,
    lazyLoad: 'progressive',
    initialSlide: 5

  });
});

$(function() {

  $('.autoplay2').slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 900,
    pauseOnHover: false,
  });
});

$(function() {

  $('.autoplay3').slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToShow: 7,
    slidesToScroll: -1,
    autoplay: true,
    autoplaySpeed: 1100,
    pauseOnHover: false,
    initialSlide: 5
    
  });
});

$(function() {

  $('.autoplay4').slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
    pauseOnHover: false,
  });
});
