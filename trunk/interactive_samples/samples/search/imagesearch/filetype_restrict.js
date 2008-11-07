/*
*  How to search for images and restrict them by filetype.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create an ImageSearch
  var imageSearch = new google.search.ImageSearch();

  // Restrict by filetype gif
  imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_FILETYPE,
                             google.search.ImageSearch.FILETYPE_GIF);

  // Add the searcher to the SearchControl
  searchControl.addSearcher(imageSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Search!
  searchControl.execute('Dancing');
}

google.setOnLoadCallback(OnLoad, true);