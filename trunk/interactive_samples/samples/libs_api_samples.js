var tempJSON = [
  {
    "category":"Libraries API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/libraries/jquery.js"], "sampleName":"jQuery", "tags": "Libraries, jQuery JSONP, Search With JSONP"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/libraries/jqueryui.js"], "sampleName":"jQueryUI", "tags": "Libraries, Drag"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/libraries/mootools.js"], "sampleName":"MooTools", "tags": "Libraries, Tween"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/libraries/dojo.js"], "sampleName":"Dojo", "tags": "Libraries, Fade In, Fade Out"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/libraries/prototype_scriptaculous.js"], "sampleName":"Prototype Scriptaculous", "tags": "Libraries, Slide Up, Slide Down"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlibs/documentation/"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}