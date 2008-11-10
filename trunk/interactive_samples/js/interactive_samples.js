// TODO: add in alt property so the hover on the links can describe them
// TODO: add in ability to specify the html boilerplate
// TODO: add in ability to specify whether you want to be able to click on the HTML tabs or not
var codeArray = [
  {
    "category":"Search API-General",
    "samples":[
      {"files":["search/hello_world.js"], "sampleName":"Hello World"},
      {"files":["search/restrict_search.js"], "sampleName":"Set Site Restrict"},
      {"files":["search/tabbed_display_mode.js"], "sampleName":"Tabbed Display Mode"},
      {"files":["search/large_result_set.js"], "sampleName":"Large Result Set"},
      {"files":["search/expand_mode.js"], "sampleName":"Expand Mode"},
      {"files":["search/raw_search.js"], "sampleName":"Raw Search"},
      {"files":["search/show_query.js"], "sampleName":"Show Search Query"},
    ]
  },
  {
    "category":"Search API-Video Search",
    "samples":[
      {"files":["search/videosearch/youtube_channel.js"], "sampleName":"YouTube Channels"},
      {"files":["search/videosearch/youtube_feed.js"], "sampleName":"YouTube Feed"},
      {"files":["search/videosearch/youtube_setresultorder.js"], "sampleName":"Set Result Order"}
    ]
  },
  {
    "category":"Search API-Web Search",
    "samples":[
      {"files":["search/websearch/restrict_by_cse.js"], "sampleName":"Restrict by CSE"},
      {"files":["search/websearch/set_lang_restrict.js"], "sampleName":"Set Language Restriction"}
    ]
  },
  {
    "category":"Search API-Local Search",
    "samples":[
      {"files":["search/localsearch/center_search.js"], "sampleName":"Center LocalSearch"},
      {"files":["search/localsearch/localsearch_markers.js"], "sampleName":"LocalSearch + Markers"},
      {"files":["search/localsearch/map_control.js"], "sampleName":"Static Map Control"},
      {"files":["search/localsearch/restrict_results.js"], "sampleName":"Restrict Results"}
    ]
  },
  {
    "category":"Search API-News Search",
    "samples":[
      {"files":["search/newssearch/geo_restrict.js"], "sampleName":"Geo Restriction"},
      {"files":["search/newssearch/topic_restrict.js"], "sampleName":"Topic Restriction"},
      {"files":["search/newssearch/news_edition_restrict.js"], "sampleName":"News Edition Restriction"},
      {"files":["search/newssearch/search_by_date.js"], "sampleName":"Search by Date"}
    ]
  },
  {
    "category":"Search API-Image Search",
    "samples":[
      {"files":["search/imagesearch/size_restrict.js"], "sampleName":"Size Restriction"},
      {"files":["search/imagesearch/color_restrict.js"], "sampleName":"Color Restriction"},
      {"files":["search/imagesearch/imagetype_restrict.js"], "sampleName":"Imagetype Restriction"},
      {"files":["search/imagesearch/filetype_restrict.js"], "sampleName":"Filetype Restriction"}
    ]
  },
  {
    "category":"Search API-Patent Search",
    "samples":[
      {"files":["search/patentsearch/type_restrict.js"], "sampleName":"Type Restriction"}
    ]
  },
  {
    "category":"Feeds API",
    "samples":[
      {"files":["feeds/hello_world.js"], "sampleName":"Simple Feed"}
    ]
  },
  {
    "category":"Language API-Translation",
    "samples":[
      {"files":["language/translation/translate.js"], "sampleName":"Translate"},
      {"files":["language/translation/batch_translate.js"], "sampleName":"Batch Translate"},
            {"files":["language/translation/detect_language.js"], "sampleName":"Language Detect"}
    ]
  },
  {
    "category":"Language API-Transliteration",
    "samples":[
      {"files":["language/transliteration/transliterate.js"], "sampleName":"Transliterate"}
    ]
  },
  {
    "category":"Libraries API",
    "samples":[
      {"files":["libraries/jquery.js"], "sampleName":"jQuery"},
      {"files":["libraries/jqueryui.js"], "sampleName":"jQueryUI"},
      {"files":["libraries/mootools.js"], "sampleName":"MooTools"},
      {"files":["libraries/dojo.js"], "sampleName":"Dojo"},
      {"files":["libraries/prototype_scriptaculous.js"], "sampleName":"Prototype Scriptaculous"}
    ]
  }
];