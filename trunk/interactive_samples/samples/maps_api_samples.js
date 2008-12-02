var tempJSON = [
  {
    "category":"Maps API-Basics",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/maptype.js"], "sampleName":"Map Attributes", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/panto.js"], "sampleName":"Map Movement", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/infowindow.js"], "sampleName":"Info Windows", "tags": "Maps"}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/introduction.html"
  },
  {
    "category":"Maps API-Events",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/clickhandling.js"], "sampleName":"Map Click", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/event_moveend.js"], "sampleName":"Map Move", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/infomarker.js"], "sampleName":"Function Closure", "tags": "Maps"}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Controls",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/controls.js"], "sampleName":"Controls", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/customcontrol.js"], "sampleName":"Custom Control", "tags": "Maps"}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Overlays",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker.js"], "sampleName":"Marker", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker_setpoint.js"], "sampleName":"Marker Point", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/icons.js"], "sampleName":"Custom Icons", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/iconclass.js"], "sampleName":"Icon Class", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker_setimage.js"], "sampleName":"Marker Image", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/markermanager.js"], "sampleName":"Marker Manager", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/polyline.js"], "sampleName":"Polyline", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/groundoverlay.js"], "sampleName":"Ground Overlay", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/tilelayeroverlay.js"], "sampleName":"Tile Layer Overlay", "tags": "Maps"}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Services",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/downloadurl.js"], "sampleName":"XMLHttpRequest", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/geocoder.js"], "sampleName":"Geocoder", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/geoxml_kml.js"], "sampleName":"KML Overlay", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/trafficoverlay.js"], "sampleName":"Traffic Overlay", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directions.js"], "sampleName":"Directions", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directionswp.js"], "sampleName":"Directions Waypoints", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directions_advanced.js"], "sampleName":"Directions (Advanced)", "tags": "Maps"}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
