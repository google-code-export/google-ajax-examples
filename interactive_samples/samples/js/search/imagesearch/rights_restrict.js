/*
 *  How to search for images with specific licensing rights.
 */

google.load('search', '1');

function onLoad() {
  // Create a search control.
  var searchControl = new google.search.SearchControl();

  // Create an ImageSearch.
  var imageSearch = new google.search.ImageSearch();

  // We want only images which allow modification and commercial use.
  imageSearch.setRestriction(
      google.search.ImageSearch.RESTRICT_RIGHTS,
      google.search.ImageSearch.RIGHTS_COMMERCIAL_MODIFICATION);

  // Add the searcher to the SearchControl.
  searchControl.addSearcher(imageSearch);

  // Tell the searcher to draw itself and tell it where to attach.
  searchControl.draw(document.getElementById('content'));

  // Search!
  searchControl.execute('kitten');
}

google.setOnLoadCallback(onLoad);
