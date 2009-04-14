google.load('search', '1');

function OnLoad() {

  // create a search control
  var searchControl = new google.search.SearchControl();

  // web search, open, alternate root
  var options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
  options.setRoot(document.getElementById("somewhere_else"));
  searchControl.addSearcher(new google.search.WebSearch(), options);

  searchControl.addSearcher(new google.search.LocalSearch());
  searchControl.addSearcher(new google.search.BlogSearch());

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("search_control"));

  // execute an inital search
  searchControl.execute("Ferrari Enzo");
}
google.setOnLoadCallback(OnLoad);