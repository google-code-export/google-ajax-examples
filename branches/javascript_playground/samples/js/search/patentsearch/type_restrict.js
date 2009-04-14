/*
*  How to search for patents and restrict the search by patent type.
*  Types are listed here:
*  http://code.google.com/apis/ajaxsearch/documentation/reference.html#_class_GpatentSearch
*/

google.load('search', '1');

function OnLoad() {
  // Create a search control
  var searchControl = new google.search.SearchControl();

  // Create an ImageSearch
  var patentSearch = new google.search.PatentSearch();

  // Restrict by issued patents
  patentSearch.setRestriction(google.search.PatentSearch.RESTRICT_TYPE,
                              google.search.PatentSearch.TYPE_ISSUED_PATENTS);

  // Add the searcher to the SearchControl
  searchControl.addSearcher(patentSearch);

  // tell the searcher to draw itself and tell it where to attach
  searchControl.draw(document.getElementById("content"));

  // Search!
  searchControl.execute('Boeing');
}

google.setOnLoadCallback(OnLoad);