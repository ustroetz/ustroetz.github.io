var func1 = function(direction) {
  if (direction == "right") {

    $("#starter").fadeOut(1000);
    $(".jumbotron").fadeTo(1000, 1, function(){
      $(this).css('background-image', 'none');
      $(this).css('background-color', '#F7F9F8');

    });
    $("#bio").fadeIn(1000);
    setTimeout(loadMap, 1500)


  }
  else if (direction == "left") {
    $("#bio").fadeOut(1000);
    $(".jumbotron").fadeTo(1000, 1, function(){
      $(this).css('background-image', "url('../images/starter3.jpg')");
      $(this).css('background-color', 'none');
    });
    $("#starter").fadeIn(1000);


  };
};

var func2 = function(direction) {
  if (direction == "right") {
    $("#text1").hide();
    $("#text2").show();
  }
  else if (direction == "left") {
    $("#text2").hide();
    $("#text1").show();

  };
};

var func3 = function(direction) {
  if (direction == "right") {
    addPoint(fairbanks, 'Fairbanks');
    map.panTo(fairbanks, {animate: true, duration: 5.0});
  }
  else if (direction == "left") {
    $("#text3").hide();
    $("#text2").show();
  };
};

var func4 = function(direction) {
  if (direction == "right") {
    addPoint(portland, 'Portland');
    map.panTo(portland, {animate: true, duration: 5.0});

  }
  else if (direction == "left") {
    $("#d").hide();
  };
};

var func5 = function(direction) {
  if (direction == "right") {
    addPoint(salzburg, 'Salzburg');
    map.panTo(salzburg, {animate: true, duration: 5.0});

  }
  else if (direction == "left") {
    $("#d").hide();
  };
};

var func5 = function(direction) {
  if (direction == "right") {
    addPoint(girona, 'Girona');
    map.panTo(girona,   {animate: true, duration: 5.0});
  }
  else if (direction == "left") {
    $("#d").hide();
  };
};



var main = function() {
  var step = 0;
  var maxStep = 10;
  var previousDirection = "right";

  $(document).keydown(function(e) {
    if (e.which == 37){
      var direction = "left";
    }
    else if (e.which == 39){
      var direction = "right";
    }
    console.log("current: " + direction);
    console.log("previous: " + previousDirection);

    if (direction == "right") {
      if (previousDirection == "right" && step < maxStep){
        step += 1;
      }
      previousDirection = "right"
    }
    else if (direction == "left") {
      if (previousDirection == "left"){
        if (step > 1) {
          step -= 1;
        }
      }
      previousDirection = "left";
    };

    var funcName = "func" + step.toString();
    console.log(funcName);
    window[funcName](direction);
  });
};


$(document).ready(main);
