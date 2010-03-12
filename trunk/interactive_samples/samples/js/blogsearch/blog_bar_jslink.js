// Use JavaScript in a link to change the search query displayed in a horizontal // Blog Bar. 

var blogBar;

function loadBlogBar() {
  var options = {
  	horizontal : true,
    autoExecuteList : {
        executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  // Use <a href="javascript:blogBar.execute('query');">Link text</a> to load 
  // the specified query in the blogBarx div.   
  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);
// Use JavaScript in a link to change the search query displayed in a horizontal // Blog Bar. 

var blogBar;

function loadBlogBar() {
  var options = {
  	horizontal : true,
    autoExecuteList : {
        executeList : ['Obama', 'NASDAQ, Wall Street']
    }
  };

  // Use <a href="javascript:blogBar.execute('query');">Link text</a> to load 
  // the specified query in the blogBarx div.   
  blogBar = new GSblogBar(document.getElementById('blogBarDiv'), options);
}

// Call this function when the page loads
google.setOnLoadCallback(loadBlogBar);