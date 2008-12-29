/*
*  How to load a feed via the Feeds API.
*/

google.load("feeds", "1");

// Our callback function, for when a feed is loaded.
function feedLoaded(result) {
  if (!result.error) {
    // Grab the container we will put the results into
    var container = document.getElementById("content");
    container.innerHTML = '';

    // Loop through the feeds, putting the titles onto the page.
    // Check out the result object for a list of properties returned in each entry.
    // http://code.google.com/apis/ajaxfeeds/documentation/reference.html#JSON
    for (var i = 0; i < result.feed.entries.length; i++) {
      var entry = result.feed.entries[i];
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(entry.title));
      container.appendChild(div);
    }
  }
}

function OnLoad() {
  // Create a feed instance that will grab Digg's feed.
  var feed = new google.feeds.Feed("http://www.digg.com/rss/index.xml");

  // Calling load sends the request off.  It requires a callback function.
  feed.load(feedLoaded);
}

google.setOnLoadCallback(OnLoad);