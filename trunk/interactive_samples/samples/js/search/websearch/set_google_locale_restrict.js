/*
*  How to restrict a search to a specific language using the gl URL
*  parameter.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a WebSearcher
  var webSearch = new google.search.WebSearch();

  // Set the Google locale language to France
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;
  webSearch.setRestriction(extendedArgs, {gl: 'fr'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Scooby doo in German!
  searchControl.execute('scooby doo');
}

google.setOnLoadCallback(OnLoad);
