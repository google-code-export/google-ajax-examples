// Order search results by relevance to the query. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // By default, search results appear in order of most recent publication
    // date. You can set search results to display in order of relevance to
    // search terms as follows.  
    orderBy : GSearch.ORDER_BY_RELEVANCE,

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
// Order search results by relevance to the query. 

var blogBar;
 
// Load the Blog Bar
function loadBlogBar() {

  // Configure all options below
  var options = {

    // By default, search results appear in order of most recent publication
    // date. You can set search results to display in order of relevance to
    // search terms as follows.  
    orderBy : GSearch.ORDER_BY_RELEVANCE,

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