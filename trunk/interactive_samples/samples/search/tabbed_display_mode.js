google.load('search', '1.0');

function OnLoad() {

  // create a tabbed mode search control
  var tabbed = new google.search.SearchControl();

  tabbed.addSearcher(new google.search.LocalSearch());
  tabbed.addSearcher(new google.search.WebSearch());
  tabbed.addSearcher(new google.search.BlogSearch());
  tabbed.addSearcher(new google.search.NewsSearch());
  tabbed.addSearcher(new google.search.BookSearch());
  tabbed.addSearcher(new google.search.PatentSearch());

  // draw in tabbed layout mode
  var drawOptions = new google.search.DrawOptions();
  drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
  tabbed.draw(document.getElementById("content"), drawOptions);

  tabbed.execute("Subaru STI");
}
google.setOnLoadCallback(OnLoad, true);