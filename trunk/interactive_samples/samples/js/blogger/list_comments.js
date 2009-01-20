/* 
* Retrieve a list of blog post comments
*/

// Obtain a reference to the 'content' div
var content = document.getElementById('content');

// Create the blogger service object
var bloggerService =
    new google.gdata.blogger.BloggerService('com.appspot.interactivesampler');

// The feed for a single blog. (In this case, Linus Torvalds' Blog.)
//
// The ID included in this URI can be retrieved from the <link rel="me">
// element in the Blog's HTML source
var feedUri = 'http://www.blogger.com/feeds/4999557720148026925/posts/default';

// The callback method used when getBlogPostFeed() returns blog entries
var handleBlogPostFeed = function(blogPostsFeed) {
  // Display blog's title and clear 'Loading...' message
  content.innerHTML = '<p><strong>Blog:</strong> '
                    + '<a href="'
                    + blogPostsFeed.feed.getLink('alternate').getHref()
                    + '">'
                    + blogPostsFeed.feed.getTitle().getText()
                    + '</a></p>';

  var postEntry = blogPostsFeed.feed.getEntries()[0]; // only get first post  
  var commentsFeedUri = postEntry.getRepliesLink().getHref();

  bloggerService.getBlogCommentFeed(commentsFeedUri, handleCommentFeed, handleError);
};

// The callback method used when getBlogCommentFeed() returns comments
var handleCommentFeed = function(commentsFeedRoot) {
  var commentEntries = commentsFeedRoot.feed.getEntries();

  // Buffer HTML until execution completes
  var html = '<p><strong>Recent Comments:</strong></p>';
  
  if (commentEntries.length > 0) {
    html += '<ul>';
    for(var i = 0, commentEntry; commentEntry = commentEntries[i]; i++) {
      var commentTitle = commentEntry.getTitle().getText();
      var commentLink = commentEntry.getLink('alternate').getHref();
      html += '<li>'
           + '<a href="' + commentLink + '">'
           + commentTitle + '</a></li>';
    }
    html += '</ul>';
  } else {
    html += '<p>No comments found for that post.</p>';
  }
  
  // Output buffered HTML and clear 'Loading...' message.
  content.innerHTML += html;
};

var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
};

bloggerService.getBlogPostFeed(feedUri, handleBlogPostFeed, handleError);
