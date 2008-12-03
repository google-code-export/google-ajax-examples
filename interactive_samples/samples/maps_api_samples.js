var tempJSON = [
  {
    "category":"Maps API-Basics",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/maptype.js"], "sampleName":"Map Attributes", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/panto.js"], "sampleName":"Map Movement", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/infowindow.js"], "sampleName":"Info Windows", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/introduction.html"
  },
  {
    "category":"Maps API-Events",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/clickhandling.js"], "sampleName":"Map Click", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/event_moveend.js"], "sampleName":"Map Move", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/infomarker.js"], "sampleName":"Function Closure", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Controls",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/controls.js"], "sampleName":"Controls", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/customcontrol.js"], "sampleName":"Custom Control", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Overlays",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker.js"], "sampleName":"Marker", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker_setpoint.js"], "sampleName":"Marker Point", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/icons.js"], "sampleName":"Custom Icons", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/iconclass.js"], "sampleName":"Icon Class", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/marker_setimage.js"], "sampleName":"Marker Image", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/markermanager.js"], "sampleName":"Marker Manager", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/polyline.js"], "sampleName":"Polyline", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/groundoverlay.js"], "sampleName":"Ground Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/tilelayeroverlay.js"], "sampleName":"Tile Layer Overlay", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/maps/documentation/reference.html"
  },
  {
    "category":"Maps API-Services",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/downloadurl.js"], "sampleName":"XMLHttpRequest", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/geocoder.js"], "sampleName":"Geocoder", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/geoxml_kml.js"], "sampleName":"KML Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/trafficoverlay.js"], "sampleName":"Traffic Overlay", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directions.js"], "sampleName":"Directions", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directionswp.js"], "sampleName":"Directions Waypoints", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/mapsapi.html", "files":["samples/maps/directions_advanced.js"], "sampleName":"Directions (Advanced)", "tags": ""}
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
