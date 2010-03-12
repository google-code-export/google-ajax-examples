// Show current Blog Bar results in a new div (horizontal Blog Bars only).

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Create a horizontal Blog Bar and load the results in a new div.  
    horizontal : true,
    currentResult : document.getElementById('currentResult'),
    autoExecuteList : {
      // Specify search queries.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);
// Show current Blog Bar results in a new div (horizontal Blog Bars only).

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Create a horizontal Blog Bar and load the results in a new div.  
    horizontal : true,
    currentResult : document.getElementById('currentResult'),
    autoExecuteList : {
      // Specify search queries.
      executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);