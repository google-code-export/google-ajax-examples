/*
*  How to detect the language of text.
*/

google.load("language", "1");

function initialize() {
  var content = document.getElementById('content');
  // Setting the text in the div.
  content.innerHTML = '<div id="text">Hola, me alegro mucho de verte.<\/div><div id="detected"/>';

  // Grabbing the text to translate
  var text = document.getElementById("text").innerHTML;

  // Detect the language of the text.
  google.language.detect(text, function(result) {
    var detected = document.getElementById("detected");
    // If there wasn't an error in the request
    if (!result.error) {
      var langCode = result.language;
      var langName;

      // Loop through the languages enum so that we can find the actual name of the language.
      // Learn about the languages enum here:
      // http://code.google.com/apis/ajaxlanguage/documentation/reference.html#LangNameArray
      for (var i in google.language.Languages) {
        var thisLangCode = google.language.Languages[i];
        if (thisLangCode == langCode) {
          // If we find the language code, store the language name.
          langName = i;
          break;
        }
      }

      // Se the detected language.
      detected.innerHTML = 'Detected: "' + result.language + '" - aka "' + langName + '"';
    }
  });
}
google.setOnLoadCallback(initialize);
