var map;

function onEachFeature(feature, layer) {
  var type = feature.properties.type;

  if (type == "expierence") {
    var popupContent = "<div><div><a href=" +  feature.properties.website + "><h3 class='popupHeading'>" + feature.properties.name + " - " + feature.properties.position + "</h3></a><p class='popupHeading'> (" + feature.properties.time + ")</p></div><div class='extented-popup'<p>" + feature.properties.description + "</p><p>&#9654 " + feature.properties.skills + "</p></div></div>"
  }
  else if (type == "education") {
    var popupContent = "<div><div class='popupHeading'><a href=" +  feature.properties.website + "><h3 class='popupHeading'>" + feature.properties.name + "</h3></a><p class='popupHeading'> (" + feature.properties.time + ")</p></div><p>&#9654 " + feature.properties.degree + "</p></div>"
  }
  else if (type == "home") {
    var popupContent = "<div><h3>" + feature.properties.name + "</h3></div>"
  }
    layer.bindPopup(popupContent, {
      closeButton: false,
      autoPanPadding: new L.Point(75, 100)

    });
};

map = L.mapbox.map('map', 'uli.i535bj4f', {
    zoomControl: false
  }).setView([52.526666,13.396454], 5);

var bioMarkerLayer = L.geoJson(bio, {
     onEachFeature: onEachFeature
 });




bioMarkerLayer.eachLayer(function(marker) {
  marker.on('click', function(e) {
    $( ".extented-popup" ).show();
  });
  marker.setIcon(L.mapbox.marker.icon({
          'marker-color': '#242B31'
    }));
}).addTo(map);


var initMarkerLoop = function () {
// Open popup when user mouses over a marker
map.featureLayer.on('ready', function(e) {
    var markers = [];
    bioMarkerLayer.eachLayer(function(marker) { markers.push(marker); });
    cycle(markers);

    map.on('click', function() {
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
        map.panTo(markers[i].getLatLng(), {
          animate: true,
          duration: 2.0,
          easeLinearity: 0.1,
           });
        markers[i].openPopup();
        window.setTimeout(run, 5000);
};
  };
    run();

};
};
