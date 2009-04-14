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

// Called when getBlogPostFeed() returns the list of blog posts
var handleBlogPostFeed = function(postsFeedRoot) {
  var blogTitle = postsFeedRoot.feed.getTitle().getText();
  var postEntry = postsFeedRoot.feed.getEntries()[0]; // only get first post
  var entryUri = postEntry.getSelfLink().getHref();   // post's uri
  
  // Get the blog post entry
  bloggerService.getBlogPostEntry(entryUri, 
      function(postRoot) {
        var postTitle = postRoot.entry.getTitle().getText(); 
        content.innerHTML = '<p>Title of latest post to ' + blogTitle + ': '
                          + '<strong>"' + postTitle + '"</strong></p>';
      }, 
      handleError
  );
};

var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
};

bloggerService.getBlogPostFeed(feedUri, handleBlogPostFeed, handleError);