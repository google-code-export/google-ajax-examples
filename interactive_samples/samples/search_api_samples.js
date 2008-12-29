// TODO: add in alt property so the hover on the links can describe them
var tempJSON = [
  {
    "category":"Search API-General Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/hello_world.js"], "sampleName":"Hello World", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/restrict_search.js"], "sampleName":"Set Site Restrict", "tags": "setSiteRestriction, Restrict to Site"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/tabbed_display_mode.js"], "sampleName":"Tabbed Display Mode", "tags": "Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/large_result_set.js"], "sampleName":"Large Result Set", "tags": " Result Size, Number of Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/expand_mode.js"], "sampleName":"Expand Mode", "tags": "Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/raw_search.js"], "sampleName":"Raw Search", "tags": "Custom Control, Custom Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/show_query.js"], "sampleName":"Show Search Query", "tags": "Show User Query"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/auto_search.js"], "sampleName":"Search as user Types", "tags": "Custom form, automatic search"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GSearch"
  },
  {
    "category":"Search API-Video Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_channel.js"], "sampleName":"YouTube Channels", "tags":"YouTube, Channel"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_feed.js"], "sampleName":"YouTube Feed", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_setresultorder.js"], "sampleName":"Set Result Order", "tags": "Date"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GvideoSearch"
  },
  {
    "category":"Search API-Web Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/websearch/restrict_by_cse.js"], "sampleName":"Restrict by CSE", "tags": "setSiteRestriction, Custom Search Engine"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/websearch/set_lang_restrict.js"], "sampleName":"Set Language Restriction", "tags": "Language, setRestriction"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GwebSearch"
  },
  {
    "category":"Search API-Local Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/center_search.js"], "sampleName":"Center LocalSearch", "tags": "Maps, setCenter"},
//      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/localsearch_markers.js"], "sampleName":"LocalSearch with Markers", "tags": "Markers, Viewport, Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/map_control.js"], "sampleName":"Static Map Control", "tags": "Static Maps, Prototypes, Custom Control, Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/restrict_results.js"], "sampleName":"Restrict Results", "tags": "KML, Business Listings"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/localsearch_control.js"], "sampleName":"Local Search Control", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/localsearch_control_small.js"], "sampleName":"Local Search Control Small", "tags": "Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/localsearch_control_custom_pins.js"], "sampleName":"Local Search Control Custom Pins", "tags": "Maps, Custom, Icon"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GlocalSearch"
  },
  {
    "category":"Search API-News Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/geo_restrict.js"], "sampleName":"Geo Restriction", "tags": "Location News"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/topic_restrict.js"], "sampleName":"Topic Restriction", "tags": "setRestriction, News Type"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/news_edition_restrict.js"], "sampleName":"News Edition Restriction", "tags": "setRestriction"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/search_by_date.js"], "sampleName":"Search by Date", "tags": "setRestriction"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GnewsSearch"
  },
  {
    "category":"Search API-Image Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/size_restrict.js"], "sampleName":"Size Restriction", "tags": "Small, Medium, Large, Pagination, Cursor"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/color_restrict.js"], "sampleName":"Color Restriction", "tags": "Black and White, Grayscale"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/imagetype_restrict.js"], "sampleName":"Imagetype Restriction", "tags": "News, Photo, Images"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/filetype_restrict.js"], "sampleName":"Filetype Restriction", "tags": "GIF, PNG, JPG, JPEG"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GimageSearch"
  },
  {
    "category":"Search API-Patent Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/patentsearch/type_restrict.js"], "sampleName":"Type Restriction", "tags": "Issued Patents"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GpatentSearch"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}