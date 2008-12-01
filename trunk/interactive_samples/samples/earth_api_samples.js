var tempJSON = [
  {
    "category":"Earth API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/change_balloon_content.js"], "sampleName":"Changing Balloon Content", "tags": "Earth, Change balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/close_balloon.js"], "sampleName":"Close Balloon", "tags": "Earth, Close balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/create_div_balloon.js"], "sampleName":"Create a DIV Balloon", "tags": "Earth, DIV balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_feature.js"], "sampleName":"Feature Balloons", "tags": "Earth, Feature balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_javascript.js"], "sampleName":"Javascript in a Balloon", "tags": "Earth, Javascript in balloon"},
      {"boilerplateLoc":"samples/boilerplateHTML/earthapis.html", "files":["samples/earth/balloon_string.js"], "sampleName":"HTML String Balloons", "tags": "Earth, HTML string balloons"},
    ],
    "docsUrl": "http://code.google.com/apis/ajaxfeeds/documentation/reference.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}