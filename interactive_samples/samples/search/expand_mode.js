google.load('search', '1.0');

function OnLoad() {

  // create a search control
  var searchControl = new google.search.SearchControl();

  // blog search, closed
  var options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_CLOSED);
  searchControl.addSearcher(new google.search.BlogSearch(), options);

  // local search, partial
  options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_PARTIAL);
  searchControl.addSearcher(new google.search.LocalSearch(), options);

  // web search, open
  options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
  searchControl.addSearcher(new google.search.WebSearch(), options);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // execute an inital search
  searchControl.execute("Macbook Pro");
}
google.setOnLoadCallback(OnLoad, true);
