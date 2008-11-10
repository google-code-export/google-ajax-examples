/*
*  The SearchControl manages searchers and draws a UI for them.  However,
*  searchers can be used by themselves without the SearchControl.  This is
*  called using a "Raw Searcher".  When doing this, you must handle and draw
*  the search results manually.
*/

google.load('search', '1');

var imageSearch;

function addPaginationLinks() {
  // The cursor object has all things to do with pagination
  var cursor = imageSearch.cursor;
  var curPage = cursor.currentPageIndex; // check what page the app is on
  var pagesDiv = document.createElement('div');
  for (var i = 0; i < cursor.pages.length; i++) {
    var page = cursor.pages[i];
    if (curPage == i) { // if we are on the curPage, then don't make a link
      var label = document.createTextNode(' ' + page.label + ' ');
      pagesDiv.appendChild(label);
    } else {
      // If we aren't on the current page, then we want a link to this page.
      // So we create a link that calls the gotoPage() method on the searcher.
      var link = document.createElement('a');
      link.href = 'javascript:imageSearch.gotoPage('+i+');';
      link.innerHTML = page.label;
      link.style.marginRight = '2px';
      pagesDiv.appendChild(link);
    }
  }

  var contentDiv = document.getElementById('content');
  contentDiv.appendChild(pagesDiv);
}

function searchComplete() {
  // Check that we got results
  if (imageSearch.results && imageSearch.results.length > 0) {
    // Grab our content div, clear it.
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    // Loop through our results, printing them to the page.
    var results = imageSearch.results;
    for (var i = 0; i < results.length; i++) {
      // For each result write it's title and image to the screen
      var result = results[i];
      var imgContainer = document.createElement('div');

      var title = document.createElement('h1');
      // We use titleNoFormatting so that no HTML tags are left in the title
      title.innerHTML = result.titleNoFormatting;

      var newImg = document.createElement('img');
      // There is also a result.url property which has the escaped version
      newImg.src = result.unescapedUrl;
      newImg.href = result.unescapedUrl;

      imgContainer.appendChild(title);
      imgContainer.appendChild(newImg);

      // Put our title + image in the content
      contentDiv.appendChild(imgContainer);
    }

    // Now add the paging links so the user can see more results.
    addPaginationLinks(imageSearch);
  }
}

function OnLoad() {
  // Our ImageSearch instance.
  imageSearch = new google.search.ImageSearch();

  // Restrict to extra large images only
  imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE,
                             google.search.ImageSearch.IMAGESIZE_MEDIUM);

  // Here we set a callback so that anytime a search is executed, it will call
  // the searchComplete function and pass it our ImageSearch searcher.
  // When a search completes, our ImageSearch object is automatically
  // populated with the results.
  imageSearch.setSearchCompleteCallback(this, searchComplete, null);

  // Find me a beautiful car.
  imageSearch.execute("Subaru STI");
}
google.setOnLoadCallback(OnLoad, true);