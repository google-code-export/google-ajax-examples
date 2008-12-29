/*
*  How to create a search box that automatically searches as the user types.
*/

google.load('search', '1');

var timerId;
var input;
var lastSearch = 0;
var contentDiv;

function search(query) {
  lastSearch++;
  webSearch = new google.search.WebSearch();
  webSearch.setSearchCompleteCallback(this, searchComplete, [webSearch, lastSearch]);
  webSearch.execute(query);
}

function autoSearch() {
  // we're in the event's scope, that means this keyword = the input box.
  var query = this.value;

  // clear timer if there is one, set a new timer to do a search
  if (timerId) {
    window.clearTimeout(timerId);
    timerId = null;
  }
  timerId = window.setTimeout('search(\'' + query + '\')', 250);

}

function searchComplete(searcher, searchNum) {
  // Only display results if this search was the last one done.
  if (searchNum == lastSearch) {
    // clear last search if it exists
    var lastResults = document.getElementById('results');
    if (lastResults) {
      lastResults.parentNode.removeChild(lastResults);
    }

    var results = searcher.results;
    var newResultsDiv = document.createElement('div');
    newResultsDiv.id = 'results';
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var resultHTML = '<a href="' + result.unescapedUrl + '" target="_blank">' +
                        result.content +
                        '</a><br/><br/>';
      newResultsDiv.innerHTML += resultHTML;
    }
    contentDiv.appendChild(newResultsDiv);
  }
}

function OnLoad() {
  contentDiv = document.getElementById('content');
  input = new google.search.SearchForm(true, contentDiv);
  input.input.onkeyup = autoSearch;
  input.setOnSubmitCallback = function() {
    search(input.input.value);
  };
}

google.setOnLoadCallback(OnLoad, true);