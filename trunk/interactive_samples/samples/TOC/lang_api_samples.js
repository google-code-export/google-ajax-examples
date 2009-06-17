var tempJSON = [
  {
    "category":"LanguageAPI-Methods and Enums",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html","files":["samples/js/language/methodsEnums/language_check.js"],"sampleName":"Is It Translatable?","tags":"languages isTranslatable isFontRenderingSupported closure"}
    ],
    "docsUrl":"http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language API-Translation",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/translate.js"], "sampleName":"Translate", "tags": "Basic Translate"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/batch_translate.js"], "sampleName":"Batch Translate", "tags": "JSONP, Translate to All Languages"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/detect_language.js"], "sampleName":"Language Detect", "tags": "Detect, Languages Enum"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language API-Transliteration",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/transliteration/transliterate.js"], "sampleName":"Transliterate Hindi", "tags": "Textarea, Hindi"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/transliteration/transliterateArabic.js"], "sampleName":"Transliterate Arabic", "tags": "Textarea, Hindi"}
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