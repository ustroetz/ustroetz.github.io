// map
var map;

function onEachFeature(feature, layer) {
  var popupContent = feature.properties.name;
    layer.bindPopup(popupContent);
};

var bioMarker = L.geoJson(bio, {
    onEachFeature: onEachFeature
});

var loadMap = function(){
  map = L.mapbox.map('map', 'uli.i535bj4f', {
    zoomControl: false
  }).setView([52.526666,13.396454], 5);
};

var addData = function(){
  bioMarker.addTo(map);
}


var initMarkerLoop = function () {
// Open popup when user mouses over a marker
map.featureLayer.on('ready', function(e) {
    var markers = [];
    bioMarker.eachLayer(function(marker) { markers.push(marker); });
    cycle(markers);
});

function cycle(markers) {
    var i = 0;
    function run() {
        if (++i > markers.length - 1) i = 0;
        map.setView(markers[i].getLatLng(), 2);
        markers[i].openPopup();
        window.setTimeout(run, 3000);
    }
    run();

};
};
