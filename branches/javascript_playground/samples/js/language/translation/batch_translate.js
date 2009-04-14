/*
*  How to batch up translate requests to get multiple languages.
*/

google.load("language", "1");

// This method is called when our translation is complete.
function translateComplete(results) {
  var translationDiv = document.getElementById('translation');
  if (!results.error) {
    for (var i = 0; i < results.responseData.length; i++) {
      var result = results.responseData[i];
      translationDiv.innerHTML += result.responseData.translatedText + '<br/>';
    }
  }
}

function initialize() {
  var content = document.getElementById('content');
  // Setting the text in the div.
  content.innerHTML = '<div id="text">Hello, I am very glad to see you.<\/div><div id="translation"/>';

  // Grabbing the text to translate
  var text = document.getElementById("text").innerHTML;

  // This is the name of the callback function we will have called win the results are returned
  var callbackFunction = 'translateComplete';

  // This technique below is called JSONP.  We are going to add a script to the page
  // that has the src of the query we wish to run.  When the query completes, it
  // will return JSON that will be passed to the translateComplete function
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  var source = 'http://ajax.googleapis.com/ajax/services/language/translate' +
               '?v=1.0&q=' + text;

  // We are going to translate this text to all possible translatable languages.
  // We will do this by looping through the languages enum, and checking whether
  // each one is translatable.
  // For the translatable ones, we will add a parameter to the script source to
  // denote that we want it translated to an extra language.
  for (var i in google.language.Languages) {
    var langCode = google.language.Languages[i];
    if (google.language.isTranslatable(langCode) && langCode != '') {
      // That means we can translate to this language
      var newBatchParam = '&langpair=en%7C' + langCode;
      source += newBatchParam; // add a new language to be translated
    }
  }

  source += '&callback=' + callbackFunction; // Set our callback function.
  newScript.src = source;

  // When we add this script to the head, the request is sent off.
  document.getElementsByTagName('head')[0].appendChild(newScript);
}

google.setOnLoadCallback(initialize);
