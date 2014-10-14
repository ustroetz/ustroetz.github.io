// map
var map;

var loadMap = function(){
  map = L.mapbox.map('map', 'uli.i535bj4f', {
    zoomControl: false
  }).setView([52.526666,13.396454], 5);
};

var addData = function(){
  L.geoJson(bio).addTo(map);
}
