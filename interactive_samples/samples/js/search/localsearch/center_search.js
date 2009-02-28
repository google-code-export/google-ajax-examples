/*
*  How to center a LocalSearch.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a full set of searchers
  var localSearch = new google.search.LocalSearch();
  searchControl.addSearcher(localSearch);

  // Set the Local Search center point
  localSearch.setCenterPoint("New York, NY");

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute("Museum");
}

google.setOnLoadCallback(OnLoad);
