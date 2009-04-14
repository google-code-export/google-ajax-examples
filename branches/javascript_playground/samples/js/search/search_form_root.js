google.load('search', '1');

function OnLoad() {
  // create a search control
  var searchControl = new google.search.SearchControl();

  // create a draw options object so that we
  // can position the search form root
  var options = new google.search.DrawOptions();
  options.setSearchFormRoot(document.getElementById("searchForm"));

  // populate with searchers
  searchControl.addSearcher(new google.search.WebSearch());
  searchControl.addSearcher(new google.search.VideoSearch());
  searchControl.addSearcher(new google.search.BlogSearch());

  searchControl.draw(document.getElementById("searchResults"), options);
  searchControl.execute("Ferrari Enzo");
}
google.setOnLoadCallback(OnLoad);