var tempJSON = [
  {
    "category":"Javascript API-Anonymous Functions",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_event.js"], "sampleName":"Anonymous Function for Events", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_for_clean_namespace.js"], "sampleName":"Anonymous Function for Clean Namespace", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_property_export.js"], "sampleName":"Anonymous Function Property Export", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js"
  },
  {
    "category":"Javascript API-Closure",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_simple.js"], "sampleName":"Closure Simple", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_click.js"], "sampleName":"Closure for Events", "tags": "", "docsUrl":""}
      // {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_xhr.js"], "sampleName":"Closure for XMLHttpRequests", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js"
  },
  {
    "category":"Javascript API",
    "samples":[
      {"boilerpalteLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/pass_code_as_strings.js"], "sampleName":"Passing code as a String", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#935"},
      {"boilerpalteLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/conditional_operator.js"], "sampleName":"Conditional Assignment", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#460"},
      {"boilerpalteLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/safely_use_firebug.js"], "sampleName":"Safely Use Firebug", "tags": "", "docsUrl":""},
      {"boilerpalteLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/jsonp.js"], "sampleName":"JSONP", "tags": "", "docsUrl":""}
    ]
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}