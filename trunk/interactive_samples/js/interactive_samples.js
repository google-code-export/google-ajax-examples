// TODO: add in alt property so the hover on the links can describe them
// TODO: add in ability to specify the html boilerplate
// TODO: add in ability to specify whether you want to be able to click on the HTML tabs or not
var codeArray = [
  {
    "category":"Search API-General Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/hello_world.js"], "sampleName":"Hello World", "tags": "Search, General"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/restrict_search.js"], "sampleName":"Set Site Restrict", "tags": "Search, General, setSiteRestriction, Restrict to Site"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/tabbed_display_mode.js"], "sampleName":"Tabbed Display Mode", "tags": "Search, General, Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/large_result_set.js"], "sampleName":"Large Result Set", "tags": "Search, General, Result Size, Number of Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/expand_mode.js"], "sampleName":"Expand Mode", "tags": "Search, General, Search Control"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/raw_search.js"], "sampleName":"Raw Search", "tags": "Search, General, Custom Control, Custom Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/show_query.js"], "sampleName":"Show Search Query", "tags": "Search, General, Show User Query"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GSearch"
  },
  {
    "category":"Search API-Video Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_channel.js"], "sampleName":"YouTube Channels", "tags":"Search, YouTube, Channel, Video"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_feed.js"], "sampleName":"YouTube Feed", "tags": "Search, Video"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/videosearch/youtube_setresultorder.js"], "sampleName":"Set Result Order", "tags": "Search, Video, Date"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GvideoSearch"
  },
  {
    "category":"Search API-Web Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/websearch/restrict_by_cse.js"], "sampleName":"Restrict by CSE", "tags": "Search, Web, setSiteRestriction, Custom Search Engine"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/websearch/set_lang_restrict.js"], "sampleName":"Set Language Restriction", "tags": "Search, Web, Language, setRestriction"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GwebSearch"
  },
  {
    "category":"Search API-Local Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/center_search.js"], "sampleName":"Center LocalSearch", "tags": "Search, Local, Maps, setCenter"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/localsearch_markers.js"], "sampleName":"LocalSearch with Markers", "tags": "Search, Local, Markers, Viewport, Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/map_control.js"], "sampleName":"Static Map Control", "tags": "Search, Local, Static Maps, Prototypes, Custom Control, Maps"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/localsearch/restrict_results.js"], "sampleName":"Restrict Results", "tags": "Search, Local, KML, Business Listings"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GlocalSearch"
  },
  {
    "category":"Search API-News Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/geo_restrict.js"], "sampleName":"Geo Restriction", "tags": "Search, News, Location News"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/topic_restrict.js"], "sampleName":"Topic Restriction", "tags": "Search, News, setRestriction, News Type"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/news_edition_restrict.js"], "sampleName":"News Edition Restriction", "tags": "Search, News, setRestriction"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/newssearch/search_by_date.js"], "sampleName":"Search by Date", "tags": "Search, News, setRestriction"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GnewsSearch"
  },
  {
    "category":"Search API-Image Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/size_restrict.js"], "sampleName":"Size Restriction", "tags": "Search, Images, Small, Medium, Large, Pagination, Cursor"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/color_restrict.js"], "sampleName":"Color Restriction", "tags": "Search, Images, Black and White, Grayscale"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/imagetype_restrict.js"], "sampleName":"Imagetype Restriction", "tags": "Search, Images, News, Photo, Images"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/imagesearch/filetype_restrict.js"], "sampleName":"Filetype Restriction", "tags": "Search, Images, GIF, PNG, JPG, JPEG"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GimageSearch"
  },
  {
    "category":"Search API-Patent Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/search/patentsearch/type_restrict.js"], "sampleName":"Type Restriction", "tags": "Search, Patents, Issued Patents"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GpatentSearch"
  },
  {
    "category":"Feeds API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/load_feed.js"], "sampleName":"Load Feed", "tags": "Feeds"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/historical_entries.js"], "sampleName":"Historical Entries", "tags": "Feeds, Set Number of Results"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/results_in_xml.js"], "sampleName":"Results in XML", "tags": "Feeds, XML"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/feed_control.js"], "sampleName":"Feed Control", "tags": "Feeds"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/lookup_feed.js"], "sampleName":"Lookup Feed", "tags": "Feeds, Lookup Website Associated Feed"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/feeds/find_feed.js"], "sampleName":"Find Feed", "tags": "Feeds, Query for Feeds"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxfeeds/documentation/reference.html"
  },
  {
    "category":"Language API-Translation",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/translate.js"], "sampleName":"Translate", "tags": "Language, Translation, Basic Translate"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/batch_translate.js"], "sampleName":"Batch Translate", "tags": "Language, Translation, JSONP, Translate to All Languages"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/detect_language.js"], "sampleName":"Language Detect", "tags": "Language, Translation, Detect, Languages Enum"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language API-Transliteration",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/transliteration/transliterate.js"], "sampleName":"Transliterate", "tags": "Language, Transliteration, Textarea, Hindi"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/referenceTransliteration.html"
  },
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