/*
 * The Google NewsShow embeds a news slideshow on your page, letting your users see headlines 
 * and previews of Google News Search results, based on queries that you've selected.
 *
 * This sample will show how to specify topics for the News Show.
 * A list of possible topics can be found in the documentation.
 * http://code.google.com/apis/ajaxsearch/documentation/newsshow.html
*/

google.load("elements", "1", {packages : ["newsshow"]});

function onLoad() {
  // Change the topic to business
  var options = {
    "queryList" : [
      {
        "title" : "Business News",
        "topic" : "b"
      },
      {
        "title" : "Entertainment News",
        "topic" : "e"
      }
    ]
  }
  var content = document.getElementById('content');
  var newsShow = new google.elements.NewsShow(content, options);
}

google.setOnLoadCallback(onLoad);