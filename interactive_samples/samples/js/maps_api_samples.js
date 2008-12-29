var tempJSON = [
  {
    "category":"Maps API-Basics",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/maptype.js"], "sampleName":"Map Attributes", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/panto.js"], "sampleName":"Map Movement", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/infowindow.js"], "sampleName":"Info Windows", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/introduction.html"
  },
  {
    "category":"Maps API-Events",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/clickhandling.js"], "sampleName":"Map Click", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/event_moveend.js"], "sampleName":"Map Move", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/infomarker.js"], "sampleName":"Function Closure", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Controls",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/controls.js"], "sampleName":"Controls", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/customcontrol.js"], "sampleName":"Custom Control", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Overlays",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/marker.js"], "sampleName":"Marker", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/marker_setpoint.js"], "sampleName":"Marker Point", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/icons.js"], "sampleName":"Custom Icons", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/iconclass.js"], "sampleName":"Icon Class", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/marker_setimage.js"], "sampleName":"Marker Image", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/markermanager.js"], "sampleName":"Marker Manager", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/polyline.js"], "sampleName":"Polyline", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/groundoverlay.js"], "sampleName":"Ground Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/tilelayeroverlay.js"], "sampleName":"Tile Layer Overlay", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Services",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/downloadurl.js"], "sampleName":"XMLHttpRequest", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/geocoder.js"], "sampleName":"Geocoder", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/geoxml_kml.js"], "sampleName":"KML Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/trafficoverlay.js"], "sampleName":"Traffic Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/directions.js"], "sampleName":"Directions", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/directionswp.js"], "sampleName":"Directions Waypoints", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/js/maps/directions_advanced.js"], "sampleName":"Directions (Advanced)", "tags": ""}
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
