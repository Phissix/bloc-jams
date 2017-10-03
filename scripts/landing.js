var animatePoints = function() {

    var points = document.getElementsByClassName('point');
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
