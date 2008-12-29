/*
*  How to find a feed based on a query.
*/

google.load("feeds", "1");

function OnLoad() {
  // Query for president feeds on cnn.com
  var query = 'site:cnn.com president';
  google.feeds.findFeeds(query, findDone);
}

function findDone(result) {
  // Make sure we didn't get an error.
  if (!result.error) {
    // Get content div
    var content = document.getElementById('content');
    var html = '';

    // Loop through the results and print out the title of the feed and link to
    // the url.
    for (var i = 0; i < result.entries.length; i++) {
      var entry = result.entries[i];
      html += '<p><a href="' + entry.url + '">' + entry.title + '</a></p>';
    }
    content.innerHTML = html;
  }
}

google.setOnLoadCallback(OnLoad);