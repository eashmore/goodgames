$(function () {
  $("#main").on("mouseenter", '.index-boxart', (function () {
    $(this).css('opacity', 0.2).css('box-shadow', '0px 0px 15px #fff');
  })).on('mouseleave', '.index-boxart', (function () {
    $(this).css('opacity', 1).css('box-shadow', '0px 0px 5px #98f5ff');
  }));
});
