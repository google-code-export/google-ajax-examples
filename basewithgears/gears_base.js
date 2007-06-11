var STORE_NAME = 'gears-spreadsheets';
var localServer;
var store;
var db;
var searchCounter;

var pageFiles = [
  location.pathname,
  'gears_base.js',
  '../scripts/gears_db.js',
  '../scripts/firebug/firebug.js',
  '../scripts/firebug/firebug.html',
  '../scripts/firebug/firebug.css',
  '../scripts/json_util.js',
  'style.css',
  'capture.gif'];


window.onload = function () {
  if (!window.google || !google.gears) {
    alert('Google Gears is not installed');
    return;
  }

  try {
    localServer = google.gears.factory.create('beta.localserver', '1.0');
  } catch (ex) {
    alert('Could not create local server: ' + ex.message);
    return;
  }
  
  getStore(); // Load in the offline resources (js/css/etc

  db = new GearsDB('gears-base');

  if (db) {
    db.run('create table if not exists BaseQueries' +
            ' (Phrase varchar(255), Itemtype varchar(100))');
    db.run('create table if not exists BaseFeeds' + 
            ' (id varchar(255), JSON text)');

    // Initialize the UI at startup.
    displaySearches();
    capturePageFiles();
    captureSearches();
    setInterval(captureSearches, 600000);
  }

  // Enable or disable UI elements
  var init_succeeded = !!db;
  var inputs = document.getElementsByTagName('input');
  for (var i = 0, el; el = inputs[i]; i++) {
    el.disabled = !init_succeeded;
  }
};

function handleSubmit() {
   if (!google.gears.factory || !db) {
    return;
  }

  var elm = document.getElementById('submitValue');
  var phrase = elm.value;
  var itemtype = document.getElementById('itemtypes').value;

  // Insert the new item.
  // The Gears database automatically escapes/unescapes inserted values.
  var query1 = {Phrase: phrase, Itemtype: itemtype}; 
  db.insertRow('BaseQueries', query1); 
  // Update the UI.
  elm.value = '';
  displaySearches();
  getJSON(phrase, itemtype, "loadAndDisplayFeed");
  captureSearches();
}

function getSearches() {
  return db.selectAll('select * from BaseQueries');
}

function displaySearches() {
  var searches = getSearches();
  
  var status = document.getElementById('status');
  status.innerHTML = '';
  for (var i = 0; i < searches.length; ++i) {
    var searchLink = document.createElement('a');
    var url = formUrl(searches[i].Phrase, searches[i].Itemtype);
    searchLink.setAttribute("href", "javascript:displaySearchResults('" + url + "')");
    searchLink.appendChild(document.createTextNode(searches[i].Phrase + " (" + searches[i].Itemtype + ")"));
    status.appendChild(searchLink);
    status.appendChild(document.createElement('br'));
  }
}

function getStore() { // return the store, create if needed
  store = localServer.openStore(STORE_NAME);
  if (!store) {
    store = localServer.createStore(STORE_NAME);
  }
  return store;
}

function clearServer() {
  if (localServer.openStore(STORE_NAME)) {
    localServer.removeStore(STORE_NAME);
    store = null;
  }
}

function clearTables() {
  if (db) {
    db.run('delete from BaseQueries');
    db.run('delete from BaseFeeds');
  }
  displaySearches();
}

function capture() {
  capturePageFiles();
  captureSearches();
}

function captureSearches() {
  var searches = getSearches();
  searchCounter = searches.length;
  for (var i = 0; i < searches.length; i++) {
    getJSON(searches[i].Phrase, searches[i].Itemtype, "loadFeed");
  }

}

function capturePageFiles() {
  store.capture(pageFiles, function(url, success, captureId) {
    console.log(url + ' capture ' + (success ? 'succeeded' : 'failed'));
  });
}

/**
 * Creates a script tag in the page that loads in the 
 * JSON feed for the specified key/ID. 
 * Once loaded, it calls cm_loadMapJSON.
 */
function getJSON(searchTerm, itemType, callbackName) {

  // Retrieve the JSON feed.
  var script = document.createElement('script');

  var url = formUrl(searchTerm, itemType);
  script.setAttribute('src', url + "&callback=" + callbackName);
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}

function formUrl(searchTerm, itemType) {
  var url = 'http://www.google.com/base/feeds/snippets/-/' + itemType + 
            '?alt=json-in-script&start-index=1&max-results=25&bq=' + searchTerm.replace(/ /g, '+');
  return url;
}

function loadAndDisplayFeed(json) {
  searchCounter = 1;
  loadFeed(json);
  displaySearchResults(getSelfHref(json.feed.link));
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

function loadFeed(json) {
  searchCounter--;
  document.getElementById('captureStatus').innerHTML = 'Capturing..';
  var id = getSelfHref(json.feed.link);

  var jsonString = json.toJSONString();
  var feed = {id: id, JSON: jsonString}; 
  db.forceRow('BaseFeeds', feed);
  if (searchCounter < 0) {
    document.getElementById('captureStatus').innerHTML = 'Capture complete.';
  }
}

function displaySearchResults(url) {
  var row = db.selectRow('BaseFeeds', 'id = "' + url + '"');
  var jsonString = row.JSON; 
  eval("var json=" + jsonString + ";");
  var feed = json.feed;
  var entries = feed.entry || [];
  var html = ['<h2>',feed.title.$t,'</h2>'];
  for (var i = 0; i < feed.entry.length; ++i) {
    var entry = feed.entry[i];
    var title = entry.title.$t;
    var content = entry.content.$t;
    html.push('<div class="item">');
    html.push('<h3><a href="', entry.link[0].href, '" target="_blank">', title, '</a></h3>', content, '<br>');
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

  document.getElementById("agenda").innerHTML = html.join("");
}
