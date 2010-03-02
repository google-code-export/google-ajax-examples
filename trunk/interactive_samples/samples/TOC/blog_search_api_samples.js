var tempJSON = [
  {
    "category":"Blog Search-Blog Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_hello.js"], "sampleName":"The Hello World of Blog Search", "tags": "Hello World"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_setresultsize.js"], "sampleName":"Return up to eight results", "tags": "setResultSetSize"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_setsiterestrict.js"], "sampleName":"Set a site restriction", "tags": "setSiteRestrict"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_setresultorder.js"], "sampleName":"Order search results by date", "tags": "setResultOrder"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_addquery.js"], "sampleName":"Add another search query", "tags": "setQueryAddition"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/hello.html", "files":["samples/js/blogsearch/blog_search_cursor.js"], "sampleName":"Add results pagination", "tags": "cursor"},
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Blog Search-Blog Bar",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_hello.js"], "sampleName":"Blog Bar Hello World", "tags": "Hello World"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello_horiz.html", "files":["samples/js/blogsearch/blog_bar_orient.js"], "sampleName":"Make a horizontal Blog Bar", "tags": "horizontal, vertical, layout, orientation"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_resultstyle.js"], "sampleName":"Show result titles only", "tags": "result style"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_resultnumber.js"], "sampleName":"Restrict the number of results", "tags": "size, number"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_resultorder.js"], "sampleName":"Order results by relevance", "tags": "order, relevance, date"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_siterestrict.js"], "sampleName":"Restrict results by URL", "tags": "set a site restriction, url"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello_horiz.html", "files":["samples/js/blogsearch/blog_bar_cycletime.js"], "sampleName":"Set the cycle time", "tags": "cycle time, delay"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello_horiz.html", "files":["samples/js/blogsearch/blog_bar_cyclemode.js"], "sampleName":"Cycle through queries randomly", "tags": "cycle mode, linear, random"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello_horiz_js.html", "files":["samples/js/blogsearch/blog_bar_jslink.js"], "sampleName":"Control content with a JavaScript link", "tags": "javascript link"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello_horiz_div.html", "files":["samples/js/blogsearch/blog_bar_newdiv.js"], "sampleName":"Show current result in a new div", "tags": "new div"},
      {"boilerplateLoc":"samples/boilerplateHTML/blogsearch/blog_bar_hello.html", "files":["samples/js/blogsearch/blog_bar_linktarget.js"], "sampleName":"Set a link target", "tags": "link target, blank, self, parent, top"},
    ],
    "docsUrl":"http://www.google.com/uds/solutions/blogbar/reference.html"
  }
];
if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
