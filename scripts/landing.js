var pointsArray = document.getElementsByClassName('point');

//var animatePoints = function(points) {
//helper function
var revealPoint = function(point) {
      //point class node elements
      //amimates point
      point.style.opacity = 1;
      point.style.transform = "scaleX(1) translateY(0)";
      point.style.msTransform = "scaleX(1) translateY(0)";
      point.style.WebkitTransform = "scaleX(1) translateY(0)";
}
//DO NOT use the built-in Array.prototype.forEach function
//execute a callback
var confirmPoints = function(points) {
      //executes revealPoint on points
      forEach(points, revealPoint);
    //}
}
    //page will load automatically if uncommented
    //animatePoints();
window.onload = function() {
    if (window.innerHeight > 950) {
       confirmPoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
      if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
           confirmPoints(pointsArray);
      }
    });
}
