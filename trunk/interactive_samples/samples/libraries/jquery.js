/*
*  How to load jQuery and then use the Search API with it.
*/

google.load("jquery", "1");

// on page load complete, fire off a jQuery json-p query
// against Google web search
function OnLoad(){
  var url = "http://ajax.googleapis.com/ajax/services/search/web?q=google&v=1.0&callback=?";
  $.getJSON(url, function (data) {
    if (data.responseData.results &&
        data.responseData.results.length > 0) {
      var results = data.responseData.results;
      var content = document.getElementById('content');
      content.innerHTML = '';
      for (var i=0; i < results.length; i++) {
        // Display each result however you wish
        content.innerHTML += results[i].titleNoFormatting + "<br/>";
      }
    }
  });
}

google.setOnLoadCallback(OnLoad);