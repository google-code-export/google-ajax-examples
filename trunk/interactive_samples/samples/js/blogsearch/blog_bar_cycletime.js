// Change the duration that horizontal Blog Bars display each search query. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Make a horizontal Blog Bar
    horizontal : true,
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['obama', 'NASDAQ, Wall Street'],

      // Cycle through search queries every three seconds. 
      // For a delay of ten seconds, use GSblogBar.CYCLE_TIME_LONG
      // This option is available only for horizontal Blog Bars.
      cycleTime : GSblogBar.CYCLE_TIME_SHORT
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​
// Change the duration that horizontal Blog Bars display each search query. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {
    // Make a horizontal Blog Bar
    horizontal : true,
    autoExecuteList : {

      // Specify search queries. The Blog Bar cycles linearly
      // through each query.
      executeList : ['obama', 'NASDAQ, Wall Street'],

      // Cycle through search queries every three seconds. 
      // For a delay of ten seconds, use GSblogBar.CYCLE_TIME_LONG
      // This option is available only for horizontal Blog Bars.
      cycleTime : GSblogBar.CYCLE_TIME_SHORT
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​