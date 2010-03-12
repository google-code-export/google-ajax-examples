// Set a site restriction.

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // Set a site restriction
    siteRestriction : 'blogspot.com',

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

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);
// Set a site restriction.

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // Set a site restriction
    siteRestriction : 'blogspot.com',

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

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);