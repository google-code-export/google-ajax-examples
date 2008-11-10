/*
*  How to translate text.
*/

google.load("language", "1");

function initialize() {
  var content = document.getElementById('content');
  // Setting the text in the div.
  content.innerHTML = '<div id="text">Hola, me alegro mucho de verte.<\/div><div id="translation"/>';

  // Grabbing the text to translate
  var text = document.getElementById("text").innerHTML;

  // Translate from Spanish to English, and have the callback of the request
  // put the resulting translation in the "translation" div.
  // Note: by putting in an empty string for the source language ('es') then the translation
  // will auto-detect the source language.
  google.language.translate(text, 'es', 'en', function(result) {
    var translated = document.getElementById("translation");
    if (result.translation) {
      translated.innerHTML = result.translation;
    }
  });
}
google.setOnLoadCallback(initialize);
