var tempJSON = [
  {
    "category":"Visualization API-Basics",
    "samples":[
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/table.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/table.html", "files":["samples/js/visualization/table.js"], "sampleName":"Table", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/areachart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/areachart.html", "files":["samples/js/visualization/areachart.js"], "sampleName":"Area Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/imageareachart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/imageareachart.html", "files":["samples/js/visualization/imageareachart.js"], "sampleName":"Image Area Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/columnchart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/columnchart.html", "files":["samples/js/visualization/columnchart.js"], "sampleName":"Column Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/linechart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/linechart.html", "files":["samples/js/visualization/linechart.js"], "sampleName":"Line Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/imagelinechart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/imagelinechart.html", "files":["samples/js/visualization/imagelinechart.js"], "sampleName":"Image Line Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/scatterchart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/scatterchart.html", "files":["samples/js/visualization/scatterchart.js"], "sampleName":"Scatter Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/motionchart.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/motionchart.html", "files":["samples/js/visualization/motionchart.js"], "sampleName":"Motion Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/annotatedtimeline.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/annotatedtimeline.html", "files":["samples/js/visualization/annotatedtimeline.js"], "sampleName":"Annotated Time Line", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/geomap.html", "boilerplateLoc": "samples/boilerplateHTML/visualization/geomap.html", "files":["samples/js/visualization/geomap.js"], "sampleName":"Geo Map", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/gallery.html"
  },
  {
    "category":"Visualization API-Data View",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/data_view.html", "files":["samples/js/visualization/data_view.js"], "sampleName":"Simple Data View", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/reference.html#DataView"
  },
  {
    "category":"Visualization API-Interactions",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/gauge_interaction.html", "files":["samples/js/visualization/gauge_interaction.js"], "sampleName":"Gauge Interaction", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/using_overview.html"
  },
  {
    "category":"Visualization API-Events",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/select_event.html", "files":["samples/js/visualization/select_event.js"], "sampleName":"Select Event", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/orgchart_and_table_select_event.html", "files":["samples/js/visualization/orgchart_and_table_select_event.js"], "sampleName":"Interaction Using Events", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/sort_event.html", "files":["samples/js/visualization/sort_event.js"], "sampleName":"Sort Event", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/ready_event.html", "files":["samples/js/visualization/ready_event.js"], "sampleName":"Ready Event", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/events.html"
  },
  {
    "category":"Visualization API-Data Source Requests",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/simple_query.html", "files":["samples/js/visualization/simple_query.js"], "sampleName":"Data Source Request", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/query_language.html", "files":["samples/js/visualization/query_language.js"], "sampleName":"Using The Query Language", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/queries.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
