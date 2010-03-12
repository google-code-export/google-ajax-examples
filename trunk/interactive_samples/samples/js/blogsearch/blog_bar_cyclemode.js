// Cycle through search queries randomly (horizontal Blog Bars only).

var blogBar;

// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Make a horizontal Blog Bar
    horizontal : true,
    autoExecuteList : {

      // Specify search queries. 
      executeList : ['obama', 'NASDAQ, Wall Street'],

      // Cycle through search queries randomly (linear is the default).
      cycleMode : GSblogBar.CYCLE_MODE_RANDOM
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​
// Cycle through search queries randomly (horizontal Blog Bars only).

var blogBar;

// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Make a horizontal Blog Bar
    horizontal : true,
    autoExecuteList : {

      // Specify search queries. 
      executeList : ['obama', 'NASDAQ, Wall Street'],

      // Cycle through search queries randomly (linear is the default).
      cycleMode : GSblogBar.CYCLE_MODE_RANDOM
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​