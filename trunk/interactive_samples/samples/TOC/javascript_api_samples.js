var tempJSON = [
  {
    "category":"Javascript-Define Objects, Create Prototypes",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/object_literals.js"], "sampleName":"Object Literals", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/samples/TOC/javascript_api_samples.js"},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/adding_to_object.js"], "sampleName":"Add Properties to an Object", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/samples/js/search/localsearch/local_search_control_icons.js#19"},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/creating_prototypes.js"], "sampleName":"Creating Prototypes", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/codemirror/js/codemirror.js#182"},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/overriding_prototypes.js"], "sampleName":"Overriding Prototypes", "tags": "", "docsUrl":""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/conditional_operator.js"], "sampleName":"Conditional Assignment", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#460"}
    ]
  },
  {
    "category":"Javascript-Other",
    "samples":[
      // {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/pass_code_as_strings.js"], "sampleName":"Passing code as a String", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#935"},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/jsonp.js"], "sampleName":"JSONP", "tags": "", "docsUrl":""}
    ]
  },
  {
    "category":"Javascript-Anonymous Functions",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_event.js"], "sampleName":"Anonymous Functions", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_for_clean_namespace.js"], "sampleName":"Anonymous Function for Clean Namespace", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#2"}
      // {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/anonymous_function_property_export.js"], "sampleName":"Anonymous Function Property Export", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#1106"}
    ]
  },
  {
    "category":"Javascript-Closure",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_simple.js"], "sampleName":"Closure Simple", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_click.js"], "sampleName":"Closure for Events", "tags": "", "docsUrl":"http://code.google.com/p/google-ajax-examples/source/browse/branches/javascript_playground/js/interactive_logic.js#204"}
      // {"boilerplateLoc":"samples/boilerplateHTML/javascriptapis.html", "files":["samples/js/javascript/closure_xhr.js"], "sampleName":"Closure for XMLHttpRequests", "tags": ""}
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