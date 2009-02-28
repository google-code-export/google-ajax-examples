/*
*  How to restrict a search to a specific language.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a WebSearcher
  var webSearch = new google.search.WebSearch();

  // Set the language to German
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;
  webSearch.setRestriction(extendedArgs, {lr:'lang_de'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Scooby doo in German!
  searchControl.execute('scooby doo');
}

google.setOnLoadCallback(OnLoad);
