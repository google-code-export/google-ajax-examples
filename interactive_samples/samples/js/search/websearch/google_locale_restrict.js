/*
*  How to restrict a search to a locale by choosing a localize
*  hostname for the API. For this example we use
*
*  http://www.google.de/jsapi
*
*  Click the "Edit HTML" button to see the change we made in the script tag.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Add in a WebSearch
  var webSearch = new google.search.WebSearch();

  // Add the searcher to the SearchControl
  searchControl.addSearcher(webSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute('VW GTI');
}

google.setOnLoadCallback(OnLoad);
