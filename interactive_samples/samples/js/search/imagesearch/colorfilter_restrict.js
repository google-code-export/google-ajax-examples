/*
*  How to search for images and filter them by color.
*/

google.load('search', '1');

function OnLoad() {
  var searchControlDiv = document.getElementById("content");
  var control = new GSearchControl();
  control.setResultSetSize(GSearch.LARGE_RESULTSET);
  control.setLinkTarget(GSearch.LINK_TARGET_PARENT);

  var options = new GsearcherOptions();
  options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);

  var isearcher;
  var colors = [
    GimageSearch.COLOR_RED,
    GimageSearch.COLOR_ORANGE,
    GimageSearch.COLOR_YELLOW,
    GimageSearch.COLOR_GREEN,
    GimageSearch.COLOR_TEAL,
    GimageSearch.COLOR_BLUE,
    GimageSearch.COLOR_PURPLE,
    GimageSearch.COLOR_PINK,
    GimageSearch.COLOR_WHITE,
    GimageSearch.COLOR_GRAY,
    GimageSearch.COLOR_BLACK,
    GimageSearch.COLOR_BROWN
  ];
  
  for (var i=0; i < colors.length; i++) {
    var colorSearcher = new google.search.ImageSearch();
    colorSearcher.setRestriction(GimageSearch.RESTRICT_COLORFILTER,
                                 colors[i]);
    var colorName = colors[i].substring(0,1).toUpperCase() + colors[i].substring(1);
    colorSearcher.setUserDefinedLabel(colorName);
    control.addSearcher(colorSearcher, options);
  };

  // tell the searcher to draw itself and tell it where to attach
  var drawOptions = new google.search.DrawOptions();
  drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
  control.draw(searchControlDiv, drawOptions);
  control.execute("Tree");
}

google.setOnLoadCallback(OnLoad);