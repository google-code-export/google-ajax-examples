/*
*  How to search by date (versus relevence)
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a NewsSearcher
  var newsSearch = new google.search.NewsSearch();
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;

  // Search by date (instead of relevence)
  newsSearch.setRestriction(extendedArgs, {'scoring':'d'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(newsSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // A good sport
  searchControl.execute('President');
}

google.setOnLoadCallback(OnLoad);