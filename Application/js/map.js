var map;

function onEachFeature(feature, layer) {
  var type = feature.properties.type;

  if (type == "expierence") {
    var popupContent = "<div><div><a href=" +  feature.properties.website + "><h3 class='popupHeading'>" + feature.properties.name + "</h3></a><p class='popupHeading'> (" + feature.properties.time + ")</p></div><p>" + feature.properties.description + "</p><p>&#9654 " + feature.properties.skills + "</p></div>"
  }
  else if (type == "education") {
    var popupContent = "<div><div class='popupHeading'><a href=" +  feature.properties.website + "><h3 class='popupHeading'>" + feature.properties.name + "</h3></a><p class='popupHeading'> (" + feature.properties.time + ")</p></div><p>&#9654 " + feature.properties.degree + "</p></div>"
  }
  else if (type == "home") {
    var popupContent = "<div><h3>" + feature.properties.name + "</h3></div>"
  }
    layer.bindPopup(popupContent);
};


map = L.mapbox.map('map', 'uli.i535bj4f', {
    zoomControl: false
  }).setView([52.526666,13.396454], 5);


var bioMarker = L.geoJson(bio, {
    onEachFeature: onEachFeature
}).addTo(map);



var initMarkerLoop = function () {
// Open popup when user mouses over a marker
map.featureLayer.on('ready', function(e) {
    var markers = [];
    bioMarker.eachLayer(function(marker) { markers.push(marker); });
    cycle(markers);

    map.on('click', function() {
      console.log("click");
      mapInteraction = true;
    });
});

var mapInteraction = false;


function cycle(markers) {
    var i = 0;
    var run = function (e) {
      if (!mapInteraction){
      var countMarkers = markers.length;
        if (++i > countMarkers - 1) i = 0;
        console.log(countMarkers);
        console.log(i);
        map.setView(markers[i].getLatLng(), 2);
        markers[i].openPopup();
        window.setTimeout(run, 3000);
};
  };
    run();

};
};
