/*
*  How to restrict a search to a specific website.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a WebSearch
  var webSearch = new google.search.WebSearch();

  // Restrict our search to pages from the Cartoon Newtowrk
  webSearch.setSiteRestriction('www.cartoonnetwork.com');

  // Add the searcher to the SearchControl
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute('scooby doo');
}

google.setOnLoadCallback(OnLoad);
