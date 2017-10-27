var animatePoints = function() {
    //takes single arg: index
    var revealPoint = function() {
      $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
      });
     };
      //gets called in a for loop
     $.each($('.point'), revealPoint);
};
    //page will load automatically if uncommented
    //animatePoints();
 $(window).load(function() {
   if ($(window).height() > 950) {
        animatePoints();
   }
   var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
   $(window).scroll(function(event) {
      if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
      }
   });
 });
