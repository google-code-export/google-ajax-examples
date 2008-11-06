// How to search through a YouTube channel aka http://www.youtube.com/members

google.load('search', '1.0');

function OnLoad() {

  // create a search control
  var searchControl = new google.search.SearchControl();
  
  // So the results are expanded by default
  options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
  
  // Create a video searcher and add it to the control
  searchControl.addSearcher(new google.search.VideoSearch(), options);

  // Draw the control onto the page
  searchControl.draw(document.getElementById("content"));

  // Search for a YouTube channel
  searchControl.execute("ytchannel:IBitePrettyHard");
}

google.setOnLoadCallback(OnLoad, true);