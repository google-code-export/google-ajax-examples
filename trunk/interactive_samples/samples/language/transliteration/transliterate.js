/*
*  How to setup a textarea that allows Transliteration from English to Hindi.
*/

google.load("elements", "1", {packages: "transliteration"});

function OnLoad() {
  var content = document.getElementById('content');
  // Create the HTML for our text area
  content.innerHTML = '<textarea cols="100" rows="5" id="transliterateTextarea"></textarea>' +
                      '<div>Type in (do not copy/paste): ' +
                      '<b>namaste main yahan apke madad karane ke liye hun</b></div>';

  var options = {
      sourceLanguage:
          google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage:
          google.elements.transliteration.LanguageCode.HINDI,
      shortcutKey: 'ctrl+g',
      transliterationEnabled: true
  };

  // Create an instance on TransliterationControl with the required
  // options.
  var control =
      new google.elements.transliteration.TransliterationControl(options);

  // Enable transliteration in the textbox with id
  // 'transliterateTextarea'.
  control.makeTransliteratable(['transliterateTextarea']);
}

google.setOnLoadCallback(OnLoad);