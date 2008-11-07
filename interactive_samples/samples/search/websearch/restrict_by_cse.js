/*
*  How to restrict a search to a Custom Search Engine
*  http://www.google.com/cse/
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a WebSearch
  var webSearch = new google.search.WebSearch();

  // Restrict our search to pages from our CSE
  webSearch.setSiteRestriction('017576662512468239146:omuauf_lfve', 'lectures');

  // Add the searcher to the SearchControl
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute('design');
}

google.setOnLoadCallback(OnLoad, true);
