var tempJSON = [
  {
    "category":"Earth API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/change_balloon_content.js"], "sampleName":"Changing Balloon Content", "tags": "Change balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/close_balloon.js"], "sampleName":"Close Balloon", "tags": "Close balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/create_div_balloon.js"], "sampleName":"Create a DIV Balloon", "tags": "DIV balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_feature.js"], "sampleName":"Feature Balloons", "tags": "Feature balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_javascript.js"], "sampleName":"Javascript in a Balloon", "tags": "Javascript in balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_string.js"], "sampleName":"HTML String Balloons", "tags": "HTML string balloons"}
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