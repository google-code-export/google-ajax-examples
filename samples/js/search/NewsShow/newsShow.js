/*
 * The Google NewsShow embeds a news slideshow on your page, letting your users see headlines 
 * and previews of Google News Search results, based on queries that you've selected.
 *
 * http://code.google.com/apis/ajaxsearch/documentation/newsshow.html
*/

google.load("elements", "1", {packages : ["newsshow"]});

function onLoad() {
  // Load it using all of the defaults.
  var content = document.getElementById('content');
  var newsShow = new google.elements.NewsShow(content);
}

google.setOnLoadCallback(onLoad);