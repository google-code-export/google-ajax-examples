// The "Hello, World" of Blog Search

// This code generates a "Raw Searcher" to handle search queries. The Raw Searcher requires
// you to handle and draw the search results manually.
google.load('search', '1');

var blogSearch;

function searchComplete() {
  // Check that we got results
  document.getElementById('content').innerHTML = '';
  if (blogSearch.results && blogSearch.results.length > 0) {
    for (var i = 0; i < blogSearch.results.length; i++) {

      // Create HTML elements for search results
      var p = document.createElement('p');
      var a = document.createElement('a');
      a.href = blogSearch.results[i].postUrl;
      a.innerHTML = blogSearch.results[i].title;

      // Append search results to the HTML nodes
      p.appendChild(a);
      document.body.appendChild(p);
    }
  }
}

function onLoad() {

  // Create a BlogSearch instance.
  blogSearch = new google.search.BlogSearch();

  // Set searchComplete as the callback function when a search is complete.  The
  // blogSearch object will have results in it.
  blogSearch.setSearchCompleteCallback(this, searchComplete, null);

  // Execute search query
  blogSearch.execute('1974 Chevrolet Caprice');

  // Include the required Google branding
  google.search.Search.getBranding('branding');
}

// Set a callback to call your code when the page loads
google.setOnLoadCallback(onLoad);

