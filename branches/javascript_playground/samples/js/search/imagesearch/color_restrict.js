/*
*  How to search for images and restrict them by color.
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create an ImageSearch
  var imageSearch = new google.search.ImageSearch();

  imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_COLORIZATION,
                             google.search.ImageSearch.COLORIZATION_GRAYSCALE);

  // Add the searcher to the SearchControl
  searchControl.addSearcher(imageSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Find me something fit for a fairytale
  searchControl.execute('Carriage');
}

google.setOnLoadCallback(OnLoad);