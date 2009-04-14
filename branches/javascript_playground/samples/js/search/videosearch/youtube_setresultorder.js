// How to set the result order of a video search.

google.load('search', '1');

function OnLoad() {

  // Create a search control
  var searchControl = new google.search.SearchControl();

  // So the results are expanded by default
  options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);

  // Create a video searcher
  var videoSearch = new google.search.VideoSearch();

  // Set the result order of the search - check docs for other orders
  videoSearch.setResultOrder(google.search.Search.ORDER_BY_DATE);

  // Add our searcher to the control
  searchControl.addSearcher(videoSearch, options);

  // Draw the control onto the page
  searchControl.draw(document.getElementById("content"));

  // Because laughing is healthy.
  searchControl.execute("funny");
}

google.setOnLoadCallback(OnLoad);