/*
*  How to setup a textarea that allows Transliteration from English to Arabic.
*/

// Load the Google Transliteration API
google.load("elements", "1", {packages: "transliteration"});

function OnLoad() {
  var options = {
      sourceLanguage:
          google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage:
          [google.elements.transliteration.LanguageCode.ARABIC],
      shortcutKey: 'ctrl+g',
      transliterationEnabled: true
  };

  // Create an instance on TransliterationControl with the required
  // options.
  var control =
      new google.elements.transliteration.TransliterationControl(options);

  // Create the HTML for our text area
  var content = document.getElementById('content');
  content.innerHTML = '<div id="ta3reebControl"> </div>'+
                      '<div>Type a word and hit space to get it in Arabic. ' +
                      'Click on a word to see more options.</div>' +
                      '<textarea cols="100" rows="5" id="ta3reebTextarea"></textarea>' +
                      '<div>Type in (do not copy/paste): ' +
                      '<b>mar7aban bekom fee ta3reeb</b></div>';

  // Show the transliteration control which can be used to switch between
  // English and Arabic.
  control.showControl('ta3reebControl');

  // Enable transliteration in the textbox with id
  // 'transliterateTextarea'.
  control.makeTransliteratable(['ta3reebTextarea']);
}

google.setOnLoadCallback(OnLoad);
