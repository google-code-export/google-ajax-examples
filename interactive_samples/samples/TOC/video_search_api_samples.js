var tempJSON = [
  {
    "category":"Video Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/videosearch/youtube_channel.js"], "sampleName":"YouTube Channels", "tags":"YouTube, Channel"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/videosearch/youtube_feed.js"], "sampleName":"YouTube Feed", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/videosearch/youtube_setresultorder.js"], "sampleName":"Set Result Order", "tags": "Date"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GvideoSearch"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
