google.load('search', '1.0');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a WebSearch
  var webSearch = new google.search.WebSearch();
  webSearch.setSiteRestriction('www.cartoonnetwork.com');
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute('scooby doo');
}

google.setOnLoadCallback(OnLoad, true);
