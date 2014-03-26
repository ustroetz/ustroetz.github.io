 



  self.intervals = [20, 40, 60, 80];



/// temporary GeoJsons
var geoJsonSchools = {
"type": "FeatureCollection",
                                                                                
"features": [
{ "type": "Feature", "properties": { "id": 1, "category": "Rail Station", "Category": "Odense banegård", "Name": "Odense banegård" }, "geometry": { "type": "Point", "coordinates": [ 10.38781500000022, 55.40123399999932 ] } }

]
}
/////



  self.formatIntervalsForTileLayer = function(intervals) {
    var result = [];
    for (var i = 0; i < intervals.length; i++) {
      result.push('v' + (i+1) + ':' + intervals[i]);
    }
    return result.join(';');
  };




  self.startPointsStyle = function (feature) {
   return {
      "fillColor": '#6CB3E0',
      "radius": 8,
      "color": "fillColor",
      "weight": 1,
      "opacity": 1,
      "fillOpacity": 1
      };
    };




  self.setupWMSLegend = function() {

    legend = document.getElementById('legend');
    legend.innerHTML = 'Ankomst kl. 10 fredag den 21. marts 2014 <br>  %-tal vist efter transporttid er udregnet på grundlag <br> af alle 15-19 årige bosiddende i Vesthimmerland';

    var item = document.createElement("p");
        item.appendChild(document.createTextNode("Transporttid med offentlig transport"));
        legend.appendChild(item);



    var legendTime = $('ul.legendTime')[0];

    if (legendTime) {

      var item1 = document.createElement("li");
      item1.appendChild(document.createTextNode("10 min. - 13 %"));
      legendTime.appendChild(item1);
      var item2 = document.createElement("li");
      item2.appendChild(document.createTextNode("20 min. -  \u00A0 9 %"));
      legendTime.appendChild(item2);
      var item3 = document.createElement("li");
      item3.appendChild(document.createTextNode("30 min. - 16 %"));
      legendTime.appendChild(item3);
      var item4 = document.createElement("li");
      item4.appendChild(document.createTextNode("40 min. - 15 %"));
      legendTime.appendChild(item4);
      var item5 = document.createElement("li");
      item5.appendChild(document.createTextNode("50 min. - 15 %"));
      legendTime.appendChild(item5);
      var item6 = document.createElement("li");
      item6.appendChild(document.createTextNode("60 min. - 14 %"));
      legendTime.appendChild(item6);
      var item7 = document.createElement("li");
      item7.appendChild(document.createTextNode("> 60 min. - 19 %"));
      legendTime.appendChild(item7);
      legendTime.style.background = "url('http://drivetime.mapicture.com:8080/geoserver/mapicture/wms?version=1.0.0&request=GetLegendGraphic&layer=mapicture:traveltime&style=dt4int&format=image/png&width=22&height=22&legend_options=fontColor:0xFFFFFF') no-repeat";
  };
};


  self.setupWFSLegend = function(){

    function categoriesFunc(){
      var categoriesAll = [];
      self.startPointsLayer.eachLayer(function(layer){
        var newCategory = layer.feature.properties.Category;
        if ((categoriesAll.indexOf(newCategory)) ==-1){
          categoriesAll.push(newCategory)
      };
      });
      return categoriesAll;
    };

    var categories = categoriesFunc()

    var legend = L.control({position: 'topleft'});

    legend.onAdd = function () {

      var div = L.DomUtil.create('div', 'legendPoints legend');

        div.innerHTML += '<p class="legendTitle">Placeringer af</p>'
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i class="circle" style="background:#6CB3E0"></i> ' +
                 (categories[i] ? categories[i] + '<br>' : '+');

        div.innerHTML += "<br/><br/><a><img src='http://www.mapicture.dk/img/logo.png'/></a>";
        };

        
        return div;
    };
    legend.addTo(self.map);
  };


  self.handleWFS = function (geoJsonSchools,geoJsonRegion) {
    self.startPointsLayer.addData(geoJsonSchools);
  };


  self.setupScale = function(){
    L.control.scale({maxWidth:400,imperial:false}).addTo(self.map);
  };


  self.setView = function(){
    var bounds = self.startPointsLayer.getBounds();
    var center = bounds.getCenter();
    self.map.setView(center, 9);
  };

  self.swiper = function(){
    var range = document.getElementById('range');

    function clip() {
        var nw = map.containerPointToLayerPoint([0, 0]),
            se = map.containerPointToLayerPoint(map.getSize()),
            clipX = nw.x + (se.x - nw.x) * range.value;

        self.drivetimeCar.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
    }

    range['oninput' in range ? 'oninput' : 'onchange'] = clip;
    self.map.on('move', clip);
  };



  self.mapquest = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: "©<a href='http://openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, Tiles Courtesy of <a href='http://open.mapquest.com' target='_blank'>MapQuest</a>",
    subdomains: ['1','2','3','4']
  });

  self.regions = new L.TileLayer.WMS('http://drivetime.mapicture.com:8080/geoserver/mapicture/wms', {
    layers: 'mapicture:region',
    format: 'image/png',
    styles: 'regions',
    transparent: false
  });

  self.drivetimePublic = new L.TileLayer.WMS('http://drivetime.mapicture.com:8080/geoserver/mapicture/wms', {
    layers: 'mapicture:traveltime',
    format: 'image/png',
    styles: 'dt4int',
    transparent: true,
    opacity: 1,
    viewparams: 'ids:139340368970352/139340398999911/139340432772555',
    env: self.formatIntervalsForTileLayer(intervals)
  });

  self.drivetimeCar = new L.TileLayer.WMS("http://localhost:8000/geoserver/Mapicture/wms", {
    layers: 'Mapicture:traveltime',
    format: 'image/png',
    styles: 'dt' + 6 + 'int',
    transparent: true,
    opacity: 1,
    viewparams: 'ids:139472211819000',     
    env: self.formatIntervalsForTileLayer([600,1200,1800,2400,3000,3600])
  });

  self.stops = new L.TileLayer.WMS('http://drivetime.mapicture.com:8080/geoserver/mapicture/wms', {
    layers: 'mapicture:stops',
    format: 'image/png',
    transparent: true
  });

  self.startPointsLayer = new L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, self.startPointsStyle(feature)).bindPopup(feature.properties.Name);
    }
  });

  self.adminLayer = new L.geoJson(null, {style: {
    "fillColor": "transparent",
    "color": "#404040", 
    "weight": 5,
    "opacity": 0.65
  }});

  self.map = new L.Map('map', {
    layers: [self.mapquest, self.drivetimePublic, self.drivetimeCar,  self.startPointsLayer],
    zoomControl: true
  });

  L.control.layers({

  }, {
    "Public": self.drivetimePublic,
    "Auto": self.drivetimeCar,
    "Stoppesteder": self.stops,
  }).addTo(self.map);

  
  
  self.handleWFS(geoJsonSchools);
  self.setupScale();
  self.setupWMSLegend();
  self.setupWFSLegend();
  self.setView();
  self.swiper();



