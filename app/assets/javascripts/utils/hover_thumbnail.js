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
  setTimeout( function () {
    $("#main").on("mouseenter", '.game-thumb', (function () {
      $(this).find(".index-boxart").css('opacity', 0.3);
      $(this).find('.rate').css('z-index', 10);
    })).on('mouseleave', '.game-thumb', (function () {
      $(this).find(".index-boxart").css('opacity', 1);
      $(this).find('.rate').css('z-index', -10);

    }));
  }, 500);
});