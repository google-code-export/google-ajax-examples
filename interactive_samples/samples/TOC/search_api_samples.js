// TODO: add in alt property so the hover on the links can describe them
var tempJSON = [
  {
    "category":"Search-General Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/hello_world.js"], "sampleName":"The Hello World of General Searchs", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/restrict_search.js"], "sampleName":"Set Site Restrict", "tags": "setSiteRestriction, Restrict to Site"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/tabbed_display_mode.js"], "sampleName":"Tabbed Display Mode", "tags": "Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/large_result_set.js"], "sampleName":"Large Result Set", "tags": " Result Size, Number of Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/expand_mode.js"], "sampleName":"Expand Mode", "tags": "Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/raw_search.js"], "sampleName":"Raw Search", "tags": "Custom Control, Custom Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/show_query.js"], "sampleName":"Show Search Query", "tags": "Show User Query"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/auto_search.js"], "sampleName":"Search as user Types", "tags": "Custom form, automatic search"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/searchFormRoot.html", "files":["samples/js/search/search_form_root.js"], "sampleName":"Search Form Placement", "tags": "", "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GsearcherOptions"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/searchResultPlacement.html", "files":["samples/js/search/search_result_placement.js"], "sampleName":"Search Result Placement", "tags": "", "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GsearcherOptions"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GSearch"
  },
  {
    "category":"Search-Custom Search Control",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/custom_search_control.js"], "sampleName":"Custom Search Control", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/customsearch/index.html"
  },
  {
    "category":"Search-Web Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/websearch/restrict_by_cse.js"], "sampleName":"Restrict by CSE", "tags": "setSiteRestriction, Custom Search Engine"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapisde.html", "files":["samples/js/search/websearch/google_locale_restrict.js"], "sampleName":"Set Google Locale Using Hostname", "tags": "Language"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/websearch/set_google_locale_restrict.js"], "sampleName":"Set Google Locale Restriction", "tags": "Language, setRestriction"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/websearch/set_lang_restrict.js"], "sampleName":"Set Language Restriction", "tags": "Language, setRestriction"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GwebSearch"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
