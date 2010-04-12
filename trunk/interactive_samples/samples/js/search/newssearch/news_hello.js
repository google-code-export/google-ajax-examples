// This code generates a "Raw Searcher" to handle search queries. The Raw 
// Searcher requires you to handle and draw the search results manually.
google.load('search', '1');

var newsSearch;

function searchComplete() {

  // Check that we got results
  document.getElementById('content').innerHTML = '';
  if (newsSearch.results && newsSearch.results.length > 0) {
    for (var i = 0; i < newsSearch.results.length; i++) {

      // Create HTML elements for search results
      var p = document.createElement('p');
      var a = document.createElement('a');
      a.href = newsSearch.results[i].url;
      a.innerHTML = newsSearch.results[i].title;

      // Append search results to the HTML nodes
      p.appendChild(a);
      document.body.appendChild(p);
    }
  }
}

function onLoad() {

  // Create a News Search instance.
  newsSearch = new google.search.NewsSearch();
  
  // Set searchComplete as the callback function when a search is 
  // complete.  The newsSearch object will have results in it.
  newsSearch.setSearchCompleteCallback(this, searchComplete, null);

  // Specify search quer(ies)
  newsSearch.execute('Barack Obama');

  // Include the required Google branding
  google.search.Search.getBranding('branding');
}

// Set a callback to call your code when the page loads
google.setOnLoadCallback(onLoad);
