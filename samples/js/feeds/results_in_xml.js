/*
*  How to receive results in XML.
*/

google.load("feeds", "1");

// Our callback function, for when a feed is loaded.
function feedLoaded(result) {
  if (!result.error) {
    // Get and clear our content div.
    var content = document.getElementById('content');
    content.innerHTML = '';

    // Get all items returned.
    var items = result.xmlDocument.getElementsByTagName('item');
    // Loop through our items
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      // Get the title from the element.  firstChild is the text node containing
      // the title, and nodeValue returns the value of it.
      var title = item.getElementsByTagName('title')[0].firstChild.nodeValue;

      content.appendChild(document.createTextNode(title)); // Append the title to the page
      content.appendChild(document.createElement('br')); // Add a new line
    }
  }
}

function OnLoad() {
  // Create a feed instance that will grab Digg's feed.
  var feed = new google.feeds.Feed("http://www.digg.com/rss/index.xml");

  // Request the results in XML
  feed.setResultFormat(google.feeds.Feed.XML_FORMAT);

  // Calling load sends the request off.  It requires a callback function.
  feed.load(feedLoaded);
}

google.setOnLoadCallback(OnLoad);