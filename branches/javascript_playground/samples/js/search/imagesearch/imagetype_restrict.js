/*
*  How to restrict an image search to a face.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create an ImageSearch
  var imageSearch = new google.search.ImageSearch();

  // Restrict to faces.  Other options include:
  // IMAGETYPE_NEWS
  // IMAGETYPE_PHOTO
  imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGETYPE,
                             google.search.ImageSearch.IMAGETYPE_FACES);

  // Add the searcher to the SearchControl
  searchControl.addSearcher(imageSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // The faces of Russia
  searchControl.execute('Russia');
}

google.setOnLoadCallback(OnLoad);