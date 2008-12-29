/*
*  How to restrict a news search to a geographic location.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a NewsSearcher
  var newsSearch = new google.search.NewsSearch();

  // Set the geolocation to Australia
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;
  newsSearch.setRestriction(extendedArgs, {'geo':'Australia'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(newsSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Australian for...
  searchControl.execute('Fosters');
}

google.setOnLoadCallback(OnLoad, true);