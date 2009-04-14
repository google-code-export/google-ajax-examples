/*
*  How to access the query of each search.
*/

google.load('search', '1');

// Whenever a search starts, alert the query.
function searchStart(searchControl, searcher, query) {
  var content = document.getElementById('content');
  var queryDiv = document.getElementById('query');
  if (! queryDiv) {
    var queryDiv = document.createElement('div');
    queryDiv.id = 'query';
    document.body.appendChild(queryDiv);
  }
  queryDiv.innerHTML = "User searched for: " + query;
}

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add a WebSearcher
  searchControl.addSearcher(new google.search.WebSearch());

  // Set a callback so that whenever a search is started we will call searchStart
  searchControl.setSearchStartingCallback(this, searchStart);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute("VW GTI");
}

google.setOnLoadCallback(OnLoad);