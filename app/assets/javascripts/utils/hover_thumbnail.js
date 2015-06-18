// $(function () {
//   setTimeout( function () {
//     $(".game-thumb").mouseenter(function () {
//       $(this).find("#boxart").css('opacity', 0.3);
//       $(this).find('.rate').attr('type', 'number').attr('data-size', "xs").rating();
//     }).mouseleave(function () {
//       $(this).find("#boxart").css('opacity', 1);
//       $(this).find('.rate').attr('type', 'hidden').rating('clear');
//     });
//   }, 200);
// });

$(function () {
  $("#main").on("mouseenter", '.index-boxart', (function () {
    $(this).css('opacity', 0.2).css('box-shadow', '0px 0px 15px #fff');
    // $(this).find('.rate').css('zIndex', 10);
  })).on('mouseleave', '.index-boxart', (function () {
    $(this).css('opacity', 1).css('box-shadow', '0px 0px 5px #98f5ff');
    // $(this).find('.rate').css('zIndex', -10);
  }));
});
