/*
 * The Google NewsShow embeds a news slideshow on your page, letting your users see headlines 
 * and previews of Google News Search results, based on queries that you've selected.
 *
 * This sample will show how to specify an edition type for the news.
 * Examples are:
 * us - specifies the US edition
 * uk - specifies the UK edition
 * fr_ca - specifies the French Canadian edition
 * http://code.google.com/apis/ajaxsearch/documentation/newsshow.html
*/

google.load("elements", "1", {packages : ["newsshow"]});

function onLoad() {
  // Change the edition to French Canadian
  // And display the World news topic
  var options = {
    "queryList" : [
      {
        "title" : "French Canadian News",
        "topic" : "w",
        "ned" : "fr_ca"
      }
    ]
    
  }
  var content = document.getElementById('content');
  var newsShow = new google.elements.NewsShow(content, options);
}

google.setOnLoadCallback(onLoad);