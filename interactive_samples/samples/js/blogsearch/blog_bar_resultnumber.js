// Return a small result set (max of four results).

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // By default, Blog Bar returns a max of eight results. 
    // You can reduce the number to a maximum of four as follows: 
    largeResultSet : false,

    // Title your Blog Bar 
    title : 'News from the Blogosphere',  
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);
// Return a small result set (max of four results).

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // By default, Blog Bar returns a max of eight results. 
    // You can reduce the number to a maximum of four as follows: 
    largeResultSet : false,

    // Title your Blog Bar 
    title : 'News from the Blogosphere',  
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);