var tempJSON = [
  {
    "category":"Blogger-Blogs",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/bloggerapis.html", "files":["samples/js/blogger/list_blogs.js"], "sampleName":"List Blogs", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/blogger/docs/2.0/developers_guide_protocol.html"
  },
  {
    "category":"Blogger-Posts",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/bloggerapis.html", "files":["samples/js/blogger/list_posts.js"], "sampleName":"List Posts", "tags": ""},
    {"boilerplateLoc":"samples/boilerplateHTML/bloggerapis.html", "files":["samples/js/blogger/query_posts.js"], "sampleName":"Query Posts", "tags": ""},
    {"boilerplateLoc":"samples/boilerplateHTML/bloggerapis.html", "files":["samples/js/blogger/retrieve_post.js"], "sampleName":"Retrieve Post", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/blogger/docs/2.0/developers_guide_protocol.html"
  },
  {
    "category":"Blogger-Comments",
    "samples":[
    {"boilerplateLoc":"samples/boilerplateHTML/bloggerapis.html", "files":["samples/js/blogger/list_comments.js"], "sampleName":"List Comments", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/blogger/docs/2.0/developers_guide_protocol.html"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
