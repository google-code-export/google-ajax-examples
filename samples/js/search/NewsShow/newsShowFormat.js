/*
 * The Google NewsShow embeds a news slideshow on your page, letting your users see headlines 
 * and previews of Google News Search results, based on queries that you've selected.
 *
 * This sample will show how to change the size of the News Show.
 * http://code.google.com/apis/ajaxsearch/documentation/newsshow.html
*/

google.load("elements", "1", {packages : ["newsshow"]});

function onLoad() {
  // Change the News Show size format
  var options = {
    "format" : "300x250"
  }
  var content = document.getElementById('content');
  var newsShow = new google.elements.NewsShow(content, options);
}

google.setOnLoadCallback(onLoad);