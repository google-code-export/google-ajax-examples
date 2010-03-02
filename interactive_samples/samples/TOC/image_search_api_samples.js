var tempJSON = [
  {
    "category":"Image Search",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/imagesearch/size_restrict.js"], "sampleName":"Size Restriction", "tags": "Small, Medium, Large, Pagination, Cursor"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/imagesearch/color_restrict.js"], "sampleName":"Color Restriction", "tags": "Black and White, Grayscale"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/imagesearch/imagetype_restrict.js"], "sampleName":"Imagetype Restriction", "tags": "News, Photo, Images"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/search/imagesearch/filetype_restrict.js"], "sampleName":"Filetype Restriction", "tags": "GIF, PNG, JPG, JPEG"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/colorfilter_restrict.html", "files":["samples/js/search/imagesearch/colorfilter_restrict.js"], "sampleName": "Color Filter", "tags": "Color, Colorfilter, restrict by color"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GimageSearch"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
