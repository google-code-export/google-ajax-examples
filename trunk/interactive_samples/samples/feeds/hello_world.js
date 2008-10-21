google.load("feeds", "1");

function initialize() {
  var feed = new google.feeds.Feed("http://www.digg.com/rss/index.xml");
  feed.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("content");
      container.innerHTML = '';
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(entry.title));
        container.appendChild(div);
      }
    }
  });
}
google.setOnLoadCallback(initialize);