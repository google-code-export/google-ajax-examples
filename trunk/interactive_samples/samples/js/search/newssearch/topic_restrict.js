/*
*  How to restrict a news search to a topic.
*  Topic codes located here
*  http://code.google.com/apis/ajaxsearch/documentation/reference.html#_fonje_news
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create a NewsSearcher
  var newsSearch = new google.search.NewsSearch();
  var extendedArgs = google.search.Search.RESTRICT_EXTENDED_ARGS;

  // w stands for world!  Look at the codes linked up top for more codes.
  newsSearch.setRestriction(extendedArgs, {'topic':'w'});

  // Add the searcher to the SearchControl
  searchControl.addSearcher(newsSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // World peace, anyone?
  searchControl.execute('Peace');
}

google.setOnLoadCallback(OnLoad);