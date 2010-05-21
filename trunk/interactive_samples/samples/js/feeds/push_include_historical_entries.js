google.load('feeds', '2');
var display;

function init() {
  display = document.getElementById('content');
  display.innerHTML = '';
  var feed = new google.feeds.push.Feed('http://fastpshb.appspot.com/feed/1/fastpshb');
  feed.includeHistoricalEntries(10);
  feed.subscribe(displayEntry);
}

google.setOnLoadCallback(init);

function displayEntry(response) {
  var feed = response.feed;
  var entries = feed.entries;
  entries = entries.reverse();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = entry.title;
    var content = entry.contentSnippet;
    var link = entry.link;
    var container = document.createElement('div');
    var anchor = document.createElement('a');
    anchor.innerHTML = title;
    anchor.href = link;
    container.appendChild(anchor);
    container.appendChild(document.createElement('br'));
    var contentParagraph = document.createElement('p');
    contentParagraph.innerHTML = content;
    container.appendChild(contentParagraph);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    display.insertBefore(container, display.firstChild);
  }
}
