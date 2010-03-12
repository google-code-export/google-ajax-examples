// Set a link target

var blogBar;
 
// Load the Blog Bar.
function loadBlogBar() {

  // Configure all options below.
  var options = {

    // Title your Blog Bar (Vertical Blog Bars only - vertical is the default).
    title : 'News from the Blogosphere',  
      
    // Open links in a new window. In addition to _BLANK, you can also specify
    // _TOP or _PARENT. The default is _BLANK.
    linkTarget : GSearch.LINK_TARGET_BLANK,

    autoExecuteList : {

      // Specify search queries. 
      executeList : ['obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​
// Set a link target

var blogBar;
 
// Load the Blog Bar.
function loadBlogBar() {

  // Configure all options below.
  var options = {

    // Title your Blog Bar (Vertical Blog Bars only - vertical is the default).
    title : 'News from the Blogosphere',  
      
    // Open links in a new window. In addition to _BLANK, you can also specify
    // _TOP or _PARENT. The default is _BLANK.
    linkTarget : GSearch.LINK_TARGET_BLANK,

    autoExecuteList : {

      // Specify search queries. 
      executeList : ['obama', 'NASDAQ, Wall Street']
    }
  };

  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads.
google.setOnLoadCallback(loadBlogBar);​