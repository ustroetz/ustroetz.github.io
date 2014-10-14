
var main = function() {
  // loadMap();
  // addData();
  initMarkerLoop();


var bioBottom = $('#bio').offset().top + $('#bio').height() +28;
var examplesBottom = $('#examples').offset().top + $('#examples').height()+28;

// on scroll,
$(window).on('scroll',function(){

    // we round here to reduce a little workload
    stop = Math.round($(window).scrollTop());
    if (stop > bioBottom && stop < examplesBottom) {
        $('.navbar a').css('color', '#242B31');

      } else {
        $('.navbar a').css('color', '#F7F9F8');
   }
      });

$( "#send-email" ).click(function() {
  var emailContent = $('textarea').val();
  window.location.href = "mailto:ustroetz@gmail.com?subject=We hire you&body=" + emailContent
  console.log(emailContent);
});

};



  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash,
      $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 500, 'swing', function () {
          window.location.hash = target;
      });
  });




$(document).ready(main);
