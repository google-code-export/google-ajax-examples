/* Copyright (c) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var content;
var searchCounter = 0;

/*
 * Gears Base holds all of the logic for the Gears Base application. It is split into
 *
 * - The external interface
 *   . Onload setup (Choose the right content access adapter, and show the queries)
 *   . addQuery, displayQueries, getJSONByUrl, getJSON, displayFeed, formUrl, getSelfHref
 * 
 * - Content Access Adapters
 *   . GearsBaseContent: If Gears is installed, the application will work offline, and will run locally
 *   . CookieBaseContent: If Gears is not installed, the application will only work online, and a cookie will store your searches
 */

// -- Onload initialization

var hasGears = function() {
  return window.google && google.gears;
}

window.onload = function () {
  content = hasGears() ? new GearsBaseContent() : new CookieBaseContent();

  // Initialize the UI at startup.
  displayQueries();
};

// -- External interface

function addQuery() {
  var elm = document.getElementById('submitValue');
  var phrase = elm.value;
  var itemtype = document.getElementById('itemtypes').value;

  // Insert the new item.
  content.addQuery({ Phrase: phrase, Itemtype: itemtype });

  // Update the UI.
  elm.value = '';
  displayQueries();
  getJSON(phrase, itemtype, "loadAndDisplayFeed");
}

function displayQueries() {
  var searches = content.getQueries();
  
  var status = document.getElementById('status');
  status.innerHTML = '';
  for (var i = 0; i < searches.length; ++i) {
    var searchLink = document.createElement('a');
    var url = formUrl(searches[i].Phrase, searches[i].Itemtype);
    searchLink.setAttribute("href", "javascript:displayFeed('" + url + "')");
    searchLink.appendChild(document.createTextNode(searches[i].Phrase + " (" + searches[i].Itemtype + ")"));
    status.appendChild(searchLink);
    status.appendChild(document.createElement('br'));
  }
}

/**
 * Creates a script tag in the page that loads in the 
 * JSON feed for the specified key/ID. 
 * Once loaded, it calls cm_loadMapJSON.
 */
function getJSONByUrl(url, callbackName) {
  var script = document.createElement('script');

  script.setAttribute('src', url + "&callback=" + callbackName);
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}

function getJSON(searchTerm, itemType, callbackName) {
  var url = formUrl(searchTerm, itemType);
  getJSONByUrl(url, callbackName);
}

function loadAndDisplayFeed(json) {
  searchCounter = 1;
  loadFeed(json);
  displayFeed(getSelfHref(json.feed.link));
}  

function loadFeed(json) {
  searchCounter--;
  document.getElementById('captureStatus').innerHTML = 'Capturing..' + searchCounter;
  var id = getSelfHref(json.feed.link);
  
  content.setFeed({ id: id, JSON: json.toJSONString() });

  if (searchCounter <= 0) {
    searchCounter = 0;
    document.getElementById('captureStatus').innerHTML = 'Capture complete.';
  }
}

function displayFeed(url) {
  var baseResult = content.getFeed(url);
  if (baseResult == null) { // load it asynchronous
    getJSONByUrl(url, "loadAndDisplayFeed");
    return;
  }
  
  eval("var json=" + baseResult + ";");
  var feed = json.feed;
  var entries = feed.entry || [];
  var html = ['<h2>',feed.title.$t,'</h2>'];

  if (!feed.entry) {
    html.push('<h2>Nothing</h2>');
    document.getElementById("itemresults").innerHTML = html.join("");
    return;
  }

  for (var i = 0; i < feed.entry.length; ++i) {
    var entry = feed.entry[i];
    var title = entry.title.$t;
    var feedContent = entry.content.$t;
    html.push('<div class="item">');
    html.push('<h3><a href="', entry.link[0].href, '" target="_blank">', title, '</a></h3>', feedContent, '<br>');
    html.push('<table>');
    for (var key in entry) {
      if (entry.hasOwnProperty(key) && key.substr(0, 2)=='g$') {
        var prettykey = key.substr(2).replace(/_/g, ' ');
        html.push('<tr>');
        html.push('<td>', '<strong>', prettykey, ':</strong>', '</td>');
        html.push('<td>');
        for ( var j = 0; j < entry[key].length; j++) {
          html.push(entry[key][j].$t, "<br>");
        } 
        html.push('</td>');
        html.push('</tr>');
      }
    }
    html.push('</table>');
    html.push('</div>');
  }

  document.getElementById("itemresults").innerHTML = html.join("");
}

function formUrl(searchTerm, itemType) {
  return 'http://www.google.com/base/feeds/snippets/-/' + itemType + 
         '?alt=json-in-script&start-index=1&max-results=25&bq=' + searchTerm.replace(/ /g, '+');
}

function getSelfHref(linkArray) {
  var id = "";
  for (var i = 0; i < linkArray.length; i++) {
    if (linkArray[i].rel == "self") {
      id = linkArray[i].href;
      break;
    } 
  }
  return id;
}

// -- Content Storage Options

var GearsBaseContent = function() {
  this.storeName = 'gears-base';
  this.pageFiles = [
    location.pathname,
    'gears_base.js',
    '../scripts/gears_db.js',
    '../scripts/firebug/firebug.js',
    '../scripts/firebug/firebug.html',
    '../scripts/firebug/firebug.css',
    '../scripts/json_util.js',
    'style.css',
    'capture.gif' ];
      
  try {
    this.localServer = google.gears.factory.create('beta.localserver', '1.0');
  } catch (e) {
    alert('Could not create local server: ' + e.message);
    return;
  }
  
  // Load in the offline resources (js/css/etc)
  this.store = this.localServer.openStore(this.storeName) || this.localServer.createStore(this.storeName);

  this.db = new GearsDB('gears-base');

  if (this.db) {
    this.db.run('create table if not exists BaseQueries' +
            ' (Phrase varchar(255), Itemtype varchar(100))');
    this.db.run('create table if not exists BaseFeeds' + 
            ' (id varchar(255), JSON text)');
  }
  
  document.getElementById('debug').style.display = 'block'; // show the debug area
  this.capturePageFiles(); // Capture everything
  this.captureQueries();
  setInterval(this.captureQueries, 600000);
};

// -- Get the data that we need

GearsBaseContent.prototype.getFeed = function(url) {
  var row = this.db.selectRow('BaseFeeds', 'id = ?', [ url ]);
  return row.JSON;
}

GearsBaseContent.prototype.setFeed = function(feed) {
  this.db.forceRow('BaseFeeds', feed);
}

GearsBaseContent.prototype.getQueries = function() {
  return this.db.selectAll('select * from BaseQueries');
}

GearsBaseContent.prototype.addQuery = function(query) {
  // The Gears database automatically escapes/unescapes inserted values.
  this.db.insertRow('BaseQueries', query); 
  content.captureQueries();
}


// -- Capture Methods

GearsBaseContent.prototype.captureQueries = function() {
  var searches = this.getQueries();
  searchCounter = searches.length;
  for (var i = 0; i < searches.length; i++) {
    getJSON(searches[i].Phrase, searches[i].Itemtype, "loadFeed");
  }
}

GearsBaseContent.prototype.capturePageFiles = function() {
  this.store.capture(this.pageFiles, function(url, success, captureId) {
    console.log(url + ' capture ' + (success ? 'succeeded' : 'failed'));
  });
}

// -- Debug Methods

GearsBaseContent.prototype.clearServer = function() {
  if (this.localServer.openStore(this.storeName)) {
    this.localServer.removeStore(this.storeName);
    this.store = null;
  }
}

GearsBaseContent.prototype.clearTables = function() {
  if (this.db) {
    this.db.run('delete from BaseQueries');
    this.db.run('delete from BaseFeeds');
  }
  displayQueries();
}


// -- Cookie Storage only stores the queries, and grabs the content as needed (since you have to be online anyway)

var CookieBaseContent = function() {
  this.baseFeeds = {};
  this.baseQueries = [];
  this.cookieName = 'gears-base';
};

CookieBaseContent.prototype.getFeed = function(url) {
  if (!this.baseFeeds[url]) {
    getJSONByUrl(url, "loadFeed");
  }
  return this.baseFeeds[url];
}

CookieBaseContent.prototype.setFeed = function(feed) {
  this.baseFeeds[feed.id] = feed.JSON;
}

CookieBaseContent.prototype.getQueries = function() {
  if (this.baseQueries.length == 0) {
    this.baseQueries = this.getQueriesFromCookie() || [];
  }
  return this.baseQueries;
}

CookieBaseContent.prototype.addQuery = function(query) {
  this.baseQueries.push(query);
  this.setQueriesInCookie();
}

CookieBaseContent.prototype.setQueriesInCookie = function() {
  var queries = [];
  for (var x = 0; x < this.baseQueries.length; x++) {
    var q = this.baseQueries[x];
    queries.push(q.Phrase + '+-+' + q.Itemtype);
  }
  document.cookie = this.cookieName + '=' + queries.join('|') + '; path=/';
}

CookieBaseContent.prototype.getQueriesFromCookie = function() {
	var nameEQ = this.cookieName + "=";
	var ca = document.cookie.split(';');
	var queryObjects = [];
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) { 
		  var queries = c.substring(nameEQ.length,c.length).split('|');
	  
      for (var x = 0; x < queries.length; x++) {
        var pieces = queries[x].split('+-+');
        queryObjects.push({ Phrase: pieces[0], Itemtype: pieces[1] });
      }
		  return queryObjects;
	  }
	}
	return null;
}
