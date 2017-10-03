var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
    //takes single arg: index
    var revealPoint = function(index) {
      //point class node elements
      points[index].style.opacity = 1;
      points[index].style.transform = "scaleX(1) translateY(0)";
      points[index].style.msTransform = "scaleX(1) translateY(0)";
      points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
      }
      //gets called in a for loop
      for (var i=0; i < points.length; i++) {
        //call revealPoint on nodes
        revealPoint(i);
      }
    }
    //page will load automatically if uncommented
    //animatePoints();
 window.onload = function() {
   if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
   var sellingPoints = document.getElementsByClassName('selling-points')[0];
   var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
   window.addEventListener('scroll', function(event) {
     if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
           animatePoints(pointsArray);
       }
   });
 }
