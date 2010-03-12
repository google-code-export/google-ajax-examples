// The "Hello, World" of Blog Bar

var blogBar;
 
// Load the Blog Bar.
function loadBlogBar() {

  // Configure all options below.
  var options = {

  // Title your Blog Bar (Vertical Blog Bars only - vertical is the default).
  title : 'News from the Blogosphere',  
  autoExecuteList : {

    // Specify search queries. 
    executeList : ['obama', 'NASDAQ, Wall Street']
    }
  };
  
  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}
// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​
// The "Hello, World" of Blog Bar

var blogBar;
 
// Load the Blog Bar.
function loadBlogBar() {

  // Configure all options below.
  var options = {

  // Title your Blog Bar (Vertical Blog Bars only - vertical is the default).
  title : 'News from the Blogosphere',  
  autoExecuteList : {

    // Specify search queries. 
    executeList : ['obama', 'NASDAQ, Wall Street']
    }
  };
  
  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}
// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​