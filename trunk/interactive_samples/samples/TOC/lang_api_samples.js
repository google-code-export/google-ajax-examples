var tempJSON = [
  {
    "category":"Language-Translation",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/translate.js"], "sampleName":"Translate", "tags": "Basic Translate"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/batch_translate.js"], "sampleName":"Batch Translate", "tags": "JSONP, Translate to All Languages"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/translation/detect_language.js"], "sampleName":"Language Detect", "tags": "Detect, Languages Enum"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language-Methods and Enums",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis/isTranslatable.html","files":["samples/js/language/methodsEnums/language_check.js"],"sampleName":"Is It Translatable","tags":"languages isTranslatable isFontRenderingSupported closure"}
    ],
    "docsUrl":"http://code.google.com/apis/ajaxlanguage/documentation/reference.html"
  },
  {
    "category":"Language-Transliteration",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/transliteration/transliterate.js"], "sampleName":"Transliterate Hindi", "tags": "Textarea, Hindi"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/transliteration/transliterateArabic.js"], "sampleName":"Transliterate Arabic", "tags": "Textarea, Hindi"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/referenceTransliteration.html"
  },
  {
    "category":"Language-Virtual Keyboard",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/keyboard/keyboard.js"], "sampleName":"Virtual Keyboard", "tags":"Keyboard, Input"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/keyboard/showhide.js"], "sampleName":"Change Visibility", "tags":"Keyboard, Input"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/keyboard/setlayout.js"], "sampleName":"Change Layout", "tags":"Keyboard, Input"},
      {"boilerplateLoc":"samples/boilerplateHTML/ajaxapis.html", "files":["samples/js/language/keyboard/twokbds.js"], "sampleName":"Two Keyboards", "tags":"Keyboard, Input"}
    ],
    "docsUrl": "http://code.google.com/apis/ajaxlanguage/documentation/referenceKeyboard.html"
  }
];

if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
