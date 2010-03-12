// Create a horizontal Blog Bar.

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // Blog Bars display vertically by default. You can change the orientation
    // to horizontal as follows: 
    horizontal: true,

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
// Create a horizontal Blog Bar.

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // Blog Bars display vertically by default. You can change the orientation
    // to horizontal as follows: 
    horizontal: true,

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