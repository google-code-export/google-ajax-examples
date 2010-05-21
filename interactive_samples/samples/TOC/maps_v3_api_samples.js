var tempJSON = [
  {
    'category': 'Maps V3-Map Examples',
    'samples': [
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-simple.js'], 'sampleName': 'Map Simple V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-markers.js'], 'sampleName': 'Markers V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-animate.js'], 'sampleName': 'Animate V3', 'tags': ''},
      {'boilerplateLoc': 'samples/boilerplateHTML/mapsv3/map-simple.html', 'files': ['samples/js/mapsv3/map-infowindow.js'], 'sampleName': 'Info Window V3', 'tags': ''}
    ],
    'docsUrl': 'http://code.google.com/apis/maps/documentation/introduction.html'
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
    'docsUrl': 'http://code.google.com/apis/maps/documentation/introduction.html'
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
