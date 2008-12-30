var tempJSON = [
  {
    "category":"Visualization API-Basics",
    "samples":[
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/table.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/visualizationapi.html", "files":["samples/visualization/simple_table.js"], "sampleName":"Table", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/areachart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/areachart.js"], "sampleName":"Area Chart", "tags": ""},
      {"docsUrl": "http://code.google.com/apis/visualization/documentation/gallery/imageareachart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/imageareachart.js"], "sampleName":"Image Area Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/columnchart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/columnchart.js"], "sampleName":"Column Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/linechart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/linechart.js"], "sampleName":"Line Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/imagelinechart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/imagelinechart.js"], "sampleName":"Image Line Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/scatterchart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/onevisualization.html", "files":["samples/visualization/scatterchart.js"], "sampleName":"Scatter Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/motionchart.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/oneflashvisualization.html", "files":["samples/visualization/motionchart.js"], "sampleName":"Motion Chart", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/annotatedtimeline.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/oneflashvisualization.html", "files":["samples/visualization/annotatedtimeline2.js"], "sampleName":"Annotated Time Line", "tags": ""},
      {"docsUrl":
      "http://code.google.com/apis/visualization/documentation/gallery/geomap.html", "boilerplateLoc":"samples/boilerplateHTML/visualization/oneflashvisualization.html", "files":["samples/visualization/geomap.js"], "sampleName":"Geo Map", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/gallery.html"
  },
  {
    "category":"Visualization API-Data View",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/data_view.html", "files":["samples/visualization/data_view.js"], "sampleName":"Simple Data View", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/reference.html#DataView"
  },
  {
    "category":"Visualization API-Interactions",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/visualizationapigaugeinteraction.html", "files":["samples/visualization/gauge_interaction.js"], "sampleName":"Gauge Interaction", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/using_overview.html"
  },
  {
    "category":"Visualization API-Events",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/visualizationapi.html", "files":["samples/visualization/select_event.js"], "sampleName":"Select Event", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/visualizationapiorgchartandtableselectevent.html", "files":["samples/visualization/orgchart_and_table_select_event.js"], "sampleName":"Interaction Using Events", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/sort_event.html", "files":["samples/visualization/sort_event.js"], "sampleName":"Sort Event", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/visualization/documentation/events.html"
  },
  {
    "category":"Visualization API-Data Source Requests",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/simple_query.html", "files":["samples/visualization/simple_query.js"], "sampleName":"Data Source Request", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/visualization/simple_query.html", "files":["samples/visualization/query_language.js"], "sampleName":"Using The Query Language", "tags": ""}
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
