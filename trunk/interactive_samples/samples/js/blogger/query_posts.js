/*
* Retrieve a specific blog post
*/

// Obtain a reference to the 'content' div
var content = document.getElementById('content');

// Create the blogger service object
var bloggerService =
    new google.gdata.blogger.BloggerService('com.appspot.interactivesampler');

// The feed for a single blog. (In this case, the Official Google Blog.)
//
// The ID included in this URI can be retrieved from the <link rel="me">
// element in the Blog's HTML source
var feedUri = 'http://www.blogger.com/feeds/10861780/posts/default';

// A callback method invoked when getBlogPostFeed() returns the query results
var handleQueryResults = function(resultsFeedRoot) {
  var blogFeed = resultsFeedRoot.feed;
  var blogTitle = blogFeed.getTitle().getText();

  // Retrieve our query parameters
  var startTime = google.gdata.DateTime.toIso8601(query.getPublishedMin());
  var endTime = google.gdata.DateTime.toIso8601(query.getPublishedMax());

  content.innerHTML = '<p>Query: <strong>' + blogTitle
                    + '</strong> posts between ' + startTime + ' and '
                    + endTime + '</p>';

  // Buffer output until all tags are closed
  var html = '<ul>';
  var postEntries = blogFeed.getEntries();
  for (var i = 0; postEntry = postEntries[i]; i++) {
    var postTitle = postEntry.getTitle().getText();
    var pubDate = google.gdata.DateTime.toIso8601(postEntry.getPublished().getValue());

    html += '<li><strong>Post Title:</strong> ' + postTitle + '<br />' +
            'Published: ' + pubDate + '</li>';
  }
  html += '</ul>';
  content.innerHTML += html;
};

var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
};

// Define start/end published dates to restrict search to
var startDate = new Date('January 01, 2008 14:00:00');
var endDate = new Date('December 31, 2008 15:42:00');

// Make query global to use in queryResultsCallback()
var query = new google.gdata.blogger.BlogPostQuery(feedUri);
query.setPublishedMin(new google.gdata.DateTime(startDate));
query.setPublishedMax(new google.gdata.DateTime(endDate));

bloggerService.getBlogPostFeed(query, handleQueryResults, handleError);
