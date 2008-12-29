/*
*  How to look up a feed associated with a webpage. In this case we want to find
*  a feed associated with a Flickr user (dlc0421).
*/

google.load("feeds", "1");

function OnLoad() {
  // The page to lookup a feed on.
  var url = 'http://www.flickr.com/photos/dlc0421';

  // Go find it!  Call lookupDone when the search is complete.
  google.feeds.lookupFeed(url, lookupDone);
}

function lookupDone(result) {
  // Make sure we didn't get an error.
  if (!result.error && result.url != null) {
    var content = document.getElementById('content');
    var url = result.url;
    // Print the feed found to the page.  Note that we only ever get one result
    // back from a lookupFeed.
    content.innerHTML = '<a href="' + url + '">' + url + '</a>';
  }
}

google.setOnLoadCallback(OnLoad);