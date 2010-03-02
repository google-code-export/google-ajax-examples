var tempJSON = [
  {
    "category":"Book Search",
    "samples":[
    ],
    "docsUrl": "http://code.google.com/apis/ajaxfeeds/documentation/reference.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
