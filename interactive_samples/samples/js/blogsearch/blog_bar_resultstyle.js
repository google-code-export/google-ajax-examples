// Show only the link title in search results. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // In vertical Blog Bars only, the results by default show the 
    // title, publisher, location, snippet, and more. 
    // You can use resultStyle to show just the title. 
    resultStyle: GSblogBar.RESULT_STYLE_COMPRESSED,

    title : 'News from the Blogosphere',  
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);
// Show only the link title in search results. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // In vertical Blog Bars only, the results by default show the 
    // title, publisher, location, snippet, and more. 
    // You can use resultStyle to show just the title. 
    resultStyle: GSblogBar.RESULT_STYLE_COMPRESSED,

    title : 'News from the Blogosphere',  
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);