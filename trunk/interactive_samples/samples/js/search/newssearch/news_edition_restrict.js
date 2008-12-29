/*
*  How to restrict a news search to a specific edition of news.
*  Here is a reference of the values:
*  http://code.google.com/apis/ajaxsearch/documentation/reference.html#_fonje_news
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a NewsSearcher
  var newsSearch = new google.search.NewsSearch();
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;

  // Restrict to the UK news edition.
  newsSearch.setRestriction(extendedArgs, {'ned':'uk'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(newsSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // A good sport
  searchControl.execute('Football');
}

google.setOnLoadCallback(OnLoad, true);