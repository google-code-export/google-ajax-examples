var tempJSON = [
  {
    'category': 'Maps V3-Map Examples',
    'samples': [
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-simple.js'], 'sampleName': 'Map Simple V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-markers.js'], 'sampleName': 'Markers V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-animate.js'], 'sampleName': 'Animate V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-infowindow.js'], 'sampleName': 'Info Window V3', 'tags': ''}
    ],
    'docsUrl': 'http://code.google.com/apis/maps/documentation/javascript/basics.html'
  },
  {
    'category': 'Maps V3-Event Examples',
    'samples': [
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-simple.js'], 'sampleName': 'Event Simple V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-once.js'], 'sampleName': 'Event Listen Once V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-context.js'], 'sampleName': 'Event Context V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-closure.js'], 'sampleName': 'Event Closure V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-arguments.js'], 'sampleName': 'Event Arguments V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-event-removal.js'], 'sampleName': 'Event Removal V3', 'tags': ''}
    ],
    'docsUrl': 'http://code.google.com/apis/maps/documentation/javascript/events.html'
  },
  {
    'category': 'Maps V3-Control Examples',
    'samples': [
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-control-disabledefault.js'], 'sampleName': 'Disable Default UI V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-control-smallcontrols.js'], 'sampleName': 'Small Navigation Controls V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-control-positioning.js'], 'sampleName': 'Control Position V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-control-custom.js'], 'sampleName': 'Custom Controls V3', 'tags': ''}
    ],
    'docsUrl': 'http://code.google.com/apis/maps/documentation/javascript/controls.html'
  },
  {
    'category': 'Maps V3-Overlay Examples',
    'samples': [
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-draggablemarker.js'], 'sampleName': 'Draggable Marker V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-iconmarker.js'], 'sampleName': 'Custom Marker Image V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-complexmarker.js'], 'sampleName': 'Complex Marker Image V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-polyline.js'], 'sampleName': 'Polylines V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-polylinecomplex.js'], 'sampleName': 'Polylines Complex V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-polygon.js'], 'sampleName': 'Polygons V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-polygoncomplex.js'], 'sampleName': 'Polygons Complex V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-groundoverlay.js'], 'sampleName': 'Ground Overlays V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-infowindowcomplex.js'], 'sampleName': 'Info Windows Complex V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-overlay-infowindowshare.js'], 'sampleName': 'Info Windows Sharing V3', 'tags': ''}
    ],
    'docsUrl': 'http://code.google.com/apis/maps/documentation/javascript/overlays.html'
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
