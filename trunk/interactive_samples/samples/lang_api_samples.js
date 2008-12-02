var tempJSON = [
  {
    "category":"Language API-Translation",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/translate.js"], "sampleName":"Translate", "tags": "Basic Translate"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/batch_translate.js"], "sampleName":"Batch Translate", "tags": "JSONP, Translate to All Languages"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/translation/detect_language.js"], "sampleName":"Language Detect", "tags": "Detect, Languages Enum"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language API-Transliteration",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/language/transliteration/transliterate.js"], "sampleName":"Transliterate", "tags": "Textarea, Hindi"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/referenceTransliteration.html"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}