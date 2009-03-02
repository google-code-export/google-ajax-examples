google.load('feeds', '1');

var feeds = {};

function load() {
}

function loadFeed() {
  var feedUrl = document.getElementById('submitValue').value;
  var feed = new google.feeds.Feed(feedUrl);
  feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
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
    var latlng = getLatLng(entry.xmlNode);
    var feedContent = entry.content;
    var className = entry.isRead ? 'item-read' : 'item-unread';
    html.push('<div class="' + className + '" id="feedItem' + i + '">');
    html.push('<h3><a href="', entry.link, '" target="_blank">', title, '</a></h3>', feedContent, '<br>');

    if (latlng.lat) {
      html.push(getLinkedMap(latlng) + '<br>');
    }    

    if (entry.isRead == false) {
      html.push('<input id="markAsRead' + i + '" type="button" value="Mark this entry as read" onclick="markAsRead(\'' + feedUrl + '\',\'' + i + '\')"/>');
    }
    html.push('</div>');
  }

  document.getElementById("itemresults").innerHTML = html.join("");
}

function getLinkedMap(latlng) {
  var url = "http://maps.google.com/staticmap?center=" + latlng.lat + "," + latlng.lng + "&zoom=13&size=200x200&key=ABQIAAAAjU0EJWnWPMv7oQ-jjS7dYxSPW5CJgpdgO_s4yyMovOaVh_KvvhSfpvagV18eOyDWu7VytS6Bi1CWxw";
  var mapsUrl = "http://maps.google.com/?ll=" + latlng.lat + "," + latlng.lng + "&z=13";
  var html = '<a target="_blank" href="' + mapsUrl + '"><img src="' + url + '"></a>';
  return html;
}

function getLatLng(xmlNode) {
  var latlng = {};
  var georssNS = "http://www.georss.org/georss";
  var gmlNS = "http://www.opengis.net/gml";
  var pointnode = google.feeds.getElementsByTagNameNS(xmlNode, georssNS, "point");
  if (pointnode.length > 0) {
    latlng.lat = pointnode[0].firstChild.nodeValue.split(" ")[0];
    latlng.lng = pointnode[0].firstChild.nodeValue.split(" ")[1];
  } 
  var wherenode = google.feeds.getElementsByTagNameNS(xmlNode, georssNS, "where");
  if (wherenode.length > 0) {
    var pointnode = google.feeds.getElementsByTagNameNS(xmlNode, gmlNS, "Point");
    if (pointnode.length > 0) {
      var posnode = google.feeds.getElementsByTagNameNS(pointnode[0], gmlNS, "pos");
      latlng.lat = posnode[0].firstChild.nodeValue.split(" ")[0];
      latlng.lng = posnode[0].firstChild.nodeValue.split(" ")[1]; 
    } 
  }
  return latlng;
}

function markAsRead(feedUrl, entryNum) {
  var feed = feeds[feedUrl];

  feed.entries[entryNum].isRead = true;
  feed.numNotRead--;
  document.getElementById('feedLink' + feedUrl).innerHTML = feed.title + ' ( ' + feed.numNotRead + ')';
  document.getElementById('feedItem' + entryNum).className = 'item-read';
  document.getElementById('markAsRead' + entryNum).style.display = 'none';
}

