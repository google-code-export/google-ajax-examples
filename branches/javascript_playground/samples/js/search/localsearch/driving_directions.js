google.load('search', '1');
function OnLoad() {
  document.getElementById('content2');

  var center = "One Microsoft Way, 98052";
  // create a search control
  var searchControl = new google.search.SearchControl();

  var ls = new google.search.LocalSearch();
  ls.setCenterPoint(center);
  var options = new google.search.SearcherOptions();
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);
  options.setRoot(document.getElementById("searcherRoot"));
  searchControl.addSearcher(ls, options);

  // Start up the Searcher
  searchControl.draw(document.getElementById("searchControl"));

  // execute an inital search
  searchControl.execute("Starbucks");
}
google.setOnLoadCallback(OnLoad);
