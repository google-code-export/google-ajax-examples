// This code generates a "Raw Searcher" to handle search queries. The Raw Searcher requires
// you to handle and draw the search results manually.
google.load('search', '1');

var localSearch;
function searchComplete() {

  // Check that we got results
  document.getElementById('content').innerHTML = '';
  if (localSearch.results && localSearch.results.length > 0) {
    for (var i = 0; i < localSearch.results.length; i++) {

      // Create HTML elements for search results
      var p = document.createElement('p');
      var a = document.createElement('a');
      var b = document.createElement('b');
      var c = document.createElement('c');
      a.href = localSearch.results[i].url;
      a.innerHTML = localSearch.results[i].title;
      b.innerHTML = "<br>" + 
        localSearch.results[i].streetAddress;
      c.innerHTML = "<br>" + 
        localSearch.results[i].city + "," +
        localSearch.results[i].region;

      // Append search results to the HTML nodes
      p.appendChild(a);
      p.appendChild(b);
      p.appendChild(c);
      document.body.appendChild(p);
    }
  }
}

function onLoad() {

  // Create a LocalSearch instance.
  localSearch = new google.search.LocalSearch();

  // Set the Local Search center point
  localSearch.setCenterPoint("New York, NY");

  // Set searchComplete as the callback function when a search is complete. The
  // localSearch object will have results in it.
  localSearch.setSearchCompleteCallback(this, searchComplete, null);

  // Specify search quer(ies)
  localSearch.execute('coffee New York NY'); 
  
  // Include the required Google branding. 
  // Note that getBranding is called on google.search.Search
  google.search.Search.getBranding('branding');
}

// Set a callback to call your code when the page loads
google.setOnLoadCallback(onLoad);