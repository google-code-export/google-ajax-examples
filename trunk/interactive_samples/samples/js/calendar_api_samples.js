var tempJSON = [
  {
    "category":"Calendar Data API-Basics",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/calendarapis.html", "files":["samples/js/calendar/list_events.js"], "sampleName":"Retrieve Events", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/calendarapis.html", "files":["samples/js/calendar/query_events_fulltext.js"], "sampleName":"Full Text Queries", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/calendarapis.html", "files":["samples/js/calendar/query_events_date.js"], "sampleName":"Date Queries", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/calendar/docs/2.0/developers_guide_protocol.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
