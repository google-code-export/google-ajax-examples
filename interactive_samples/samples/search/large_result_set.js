/*
*  How to do a search that returns the max number of results per page.
*/

google.load('search', '1');

function OnLoad() {

  // create a search control
  var searchControl = new google.search.SearchControl();

  // Set the Search Control to get the most number of results
  searchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);

  // Create 3 searchers and add them to the control
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.BlogSearch());

  // Set the options to draw the control in tabbed mode
  var drawOptions = new google.search.DrawOptions();
  drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);

  // Draw the control onto the page
  searchControl.draw(document.getElementById("content"), drawOptions);

  // Search!
  searchControl.execute("Subaru STI");
}
google.setOnLoadCallback(OnLoad, true);