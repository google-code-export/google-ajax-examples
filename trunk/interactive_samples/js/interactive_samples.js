// TODO: add in alt property so the hover on the links can describe them
// TODO: add in ability to specify the html boilerplate
// TODO: add in ability to specify whether you want to be able to click on the HTML tabs or not
var codeArray = [
  {
    "category":"Search API-General Search",
    "samples":[
      {"files":["search/hello_world.js"], "sampleName":"Hello World", "tags": "Search, General"},
      {"files":["search/restrict_search.js"], "sampleName":"Set Site Restrict", "tags": "Search, General, setSiteRestriction, Restrict to Site"},
      {"files":["search/tabbed_display_mode.js"], "sampleName":"Tabbed Display Mode", "tags": "Search, General, Search Control"},
      {"files":["search/large_result_set.js"], "sampleName":"Large Result Set", "tags": "Search, General, Result Size, Number of Results"},
      {"files":["search/expand_mode.js"], "sampleName":"Expand Mode", "tags": "Search, General, Search Control"},
      {"files":["search/raw_search.js"], "sampleName":"Raw Search", "tags": "Search, General, Custom Control, Custom Results"},
      {"files":["search/show_query.js"], "sampleName":"Show Search Query", "tags": "Search, General, Show User Query"}
    ]
  },
  {
    "category":"Search API-Video Search",
    "samples":[
      {"files":["search/videosearch/youtube_channel.js"], "sampleName":"YouTube Channels", "tags":"Search, YouTube, Channel, Video"},
      {"files":["search/videosearch/youtube_feed.js"], "sampleName":"YouTube Feed", "tags": "Search, Video"},
      {"files":["search/videosearch/youtube_setresultorder.js"], "sampleName":"Set Result Order", "tags": "Search, Video, Date"}
    ]
  },
  {
    "category":"Search API-Web Search",
    "samples":[
      {"files":["search/websearch/restrict_by_cse.js"], "sampleName":"Restrict by CSE", "tags": "Search, Web, setSiteRestriction, Custom Search Engine"},
      {"files":["search/websearch/set_lang_restrict.js"], "sampleName":"Set Language Restriction", "tags": "Search, Web, Language, setRestriction"}
    ]
  },
  {
    "category":"Search API-Local Search",
    "samples":[
      {"files":["search/localsearch/center_search.js"], "sampleName":"Center LocalSearch", "tags": "Search, Local, Maps, setCenter"},
      {"files":["search/localsearch/localsearch_markers.js"], "sampleName":"LocalSearch with Markers", "tags": "Search, Local, Markers, Viewport, Maps"},
      {"files":["search/localsearch/map_control.js"], "sampleName":"Static Map Control", "tags": "Search, Local, Static Maps, Prototypes, Custom Control, Maps"},
      {"files":["search/localsearch/restrict_results.js"], "sampleName":"Restrict Results", "tags": "Search, Local, KML, Business Listings"}
    ]
  },
  {
    "category":"Search API-News Search",
    "samples":[
      {"files":["search/newssearch/geo_restrict.js"], "sampleName":"Geo Restriction", "tags": "Search, News, Location News"},
      {"files":["search/newssearch/topic_restrict.js"], "sampleName":"Topic Restriction", "tags": "Search, News, setRestriction, News Type"},
      {"files":["search/newssearch/news_edition_restrict.js"], "sampleName":"News Edition Restriction", "tags": "Search, News, setRestriction"},
      {"files":["search/newssearch/search_by_date.js"], "sampleName":"Search by Date", "tags": "Search, News, setRestriction"}
    ]
  },
  {
    "category":"Search API-Image Search",
    "samples":[
      {"files":["search/imagesearch/size_restrict.js"], "sampleName":"Size Restriction", "tags": "Search, Images, Small, Medium, Large, Pagination, Cursor"},
      {"files":["search/imagesearch/color_restrict.js"], "sampleName":"Color Restriction", "tags": "Search, Images, Black and White, Grayscale"},
      {"files":["search/imagesearch/imagetype_restrict.js"], "sampleName":"Imagetype Restriction", "tags": "Search, Images, News, Photo, Images"},
      {"files":["search/imagesearch/filetype_restrict.js"], "sampleName":"Filetype Restriction", "tags": "Search, Images, GIF, PNG, JPG, JPEG"}
    ]
  },
  {
    "category":"Search API-Patent Search",
    "samples":[
      {"files":["search/patentsearch/type_restrict.js"], "sampleName":"Type Restriction", "tags": "Search, Patents, Issued Patents"}
    ]
  },
  {
    "category":"Feeds API",
    "samples":[
      {"files":["feeds/load_feed.js"], "sampleName":"Load Feed", "tags": "Feeds"},
      {"files":["feeds/historical_entries.js"], "sampleName":"Historical Entries", "tags": "Feeds, Set Number of Results"},
      {"files":["feeds/results_in_xml.js"], "sampleName":"Results in XML", "tags": "Feeds, XML"},
      {"files":["feeds/feed_control.js"], "sampleName":"Feed Control", "tags": "Feeds"},
      {"files":["feeds/lookup_feed.js"], "sampleName":"Lookup Feed", "tags": "Feeds, Lookup Website Associated Feed"},
      {"files":["feeds/find_feed.js"], "sampleName":"Find Feed", "tags": "Feeds, Query for Feeds"}

//      {"files":["feeds/dynamic_feed.js"], "sampleName":"Dynamic Feed Control"}
    ]
  },
  {
    "category":"Language API-Translation",
    "samples":[
      {"files":["language/translation/translate.js"], "sampleName":"Translate", "tags": "Language, Translation, Basic Translate"},
      {"files":["language/translation/batch_translate.js"], "sampleName":"Batch Translate", "tags": "Language, Translation, JSONP, Translate to All Languages"},
      {"files":["language/translation/detect_language.js"], "sampleName":"Language Detect", "tags": "Language, Translation, Detect, Languages Enum"}
    ]
  },
  {
    "category":"Language API-Transliteration",
    "samples":[
      {"files":["language/transliteration/transliterate.js"], "sampleName":"Transliterate", "tags": "Language, Transliteration, Textarea, Hindi"}
    ]
  },
  {
    "category":"Libraries API",
    "samples":[
      {"files":["libraries/jquery.js"], "sampleName":"jQuery", "tags": "Libraries, jQuery JSONP, Search With JSONP"},
      {"files":["libraries/jqueryui.js"], "sampleName":"jQueryUI", "tags": "Libraries, Drag"},
      {"files":["libraries/mootools.js"], "sampleName":"MooTools", "tags": "Libraries, Tween"},
      {"files":["libraries/dojo.js"], "sampleName":"Dojo", "tags": "Libraries, Fade In, Fade Out"},
      {"files":["libraries/prototype_scriptaculous.js"], "sampleName":"Prototype Scriptaculous", "tags": "Libraries, Slide Up, Slide Down"}
    ]
  }
];