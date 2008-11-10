/*
*  How to use the Feed Control to grab, parse and display feeds.
*/

google.load("feeds", "1");

function OnLoad() {
  // Create a feed control
  var feedControl = new google.feeds.FeedControl();

  // Add two feeds.
  feedControl.addFeed("http://www.digg.com/rss/index.xml", "Digg");
  feedControl.addFeed("http://feeds.feedburner.com/Techcrunch", "TechCrunch");

  // Draw it.
  feedControl.draw(document.getElementById("content"));
}

google.setOnLoadCallback(OnLoad);