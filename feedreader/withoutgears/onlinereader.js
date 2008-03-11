google.load('feeds', '1');

var feeds = {};

function load() {
}

function loadFeed() {
  var feedUrl = document.getElementById('submitValue').value;
  var feed = new google.feeds.Feed(feedUrl);
  //feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
  feed.setNumEntries(8);
  feed.load(function(result) {
    addFeed(result.feed);
  });
}

function addFeed(feed) {
  // check if already exists
  if (feeds[feed.link]) return;
  feed.numNotRead = feed.entries.length;
  for (var i = 0; i < feed.entries.length; i++) {
    feed.entries[i].isRead = false;
  }

  feeds[feed.link] = feed;
  var searchLink = document.createElement('a');
  searchLink.id = 'feedLink' + feed.link;
  searchLink.setAttribute("href", "javascript:displayFeed('" + feed.link + "')");
  searchLink.appendChild(document.createTextNode(feed.title + ' (' + feed.numNotRead + ')'));
  var status = document.getElementById('status');
  status.appendChild(searchLink);
  status.appendChild(document.createElement('br'));
  status.appendChild(document.createElement('br'));
}

function displayFeed(feedUrl) {
  var feed = feeds[feedUrl];
  var entries = feed.entries;
  var html = ['<h2>',feed.title.$t,'</h2>'];

  if (!entries) {
    html.push('<h2>Nothing</h2>');
    document.getElementById("itemresults").innerHTML = html.join("");
    return;
  }

  for (var i = 0; i < entries.length; ++i) {
    var entry = entries[i];
    var title = entry.title;
    var feedContent = entry.content;
    var className = entry.isRead ? 'item-read' : 'item-unread';
    html.push('<div class="' + className + '" id="feedItem' + i + '">');
    html.push('<h3><a href="', entry.link, '" target="_blank">', title, '</a></h3>', feedContent, '<br>');
    if (entry.isRead == false) {
      html.push('<input id="markAsRead' + i + '" type="button" value="Mark this entry as read" onclick="markAsRead(\'' + feedUrl + '\',\'' + i + '\')"/>');
    }
    html.push('</div>');
  }

  document.getElementById("itemresults").innerHTML = html.join("");
}

function markAsRead(feedUrl, entryNum) {
  var feed = feeds[feedUrl];

  feed.entries[entryNum].isRead = true;
  feed.numNotRead--;
  document.getElementById('feedLink' + feedUrl).innerHTML = feed.title + ' ( ' + feed.numNotRead + ')';
  document.getElementById('feedItem' + entryNum).className = 'item-read';
  document.getElementById('markAsRead' + entryNum).style.display = 'none';
}

