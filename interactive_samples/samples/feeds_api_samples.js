var tempJSON = [
  {
    "category":"Feeds API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/load_feed.js"], "sampleName":"Load Feed", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/historical_entries.js"], "sampleName":"Historical Entries", "tags": "Set Number of Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/results_in_xml.js"], "sampleName":"Results in XML", "tags": "XML"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/feed_control.js"], "sampleName":"Feed Control", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/lookup_feed.js"], "sampleName":"Lookup Feed", "tags": "Lookup Website Associated Feed"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/find_feed.js"], "sampleName":"Find Feed", "tags": "Query for Feeds"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/dynamicFeedControl.html", "files":["samples/feeds/dynamic_feed_vertical.js"], "sampleName":"Dynamic Feed Control - Vertical", "tags": "Wizard", "docsUrl": "http://www.google.com/uds/solutions/dynamicfeed/reference.html"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/dynamicFeedControl.html", "files":["samples/feeds/dynamic_feed_horizontal.js"], "sampleName":"Dynamic Feed Control - Horizontal", "tags": "Wizard", "docsUrl": "http://www.google.com/uds/solutions/dynamicfeed/reference.html"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/slideshow.html", "files":["samples/feeds/slideshow.js"], "sampleName":"Slideshow of Photo Feed", "tags": "", "docsUrl": "http://www.google.com/uds/solutions/slideshow/reference.html"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxfeeds/documentation/reference.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}