/*
 * The Google NewsShow embeds a news slideshow on your page, letting your users see headlines 
 * and previews of Google News Search results, based on queries that you've selected.
 *
 * This sample will show how to specify different timers in the News Show such as:
 * deferResumeTime - This specifies the amount of time (in ms) to delay before resuming from the paused state.
 *     The default value is 300.
 * deferBootTime - Upon loading, the NewsShow immediately performs the first query and displays the results, 
 *     then begins executing the remaining queries. The NewsShow will only show results for searches that have 
 *     been returned within this amount of time (in ms). The deafult value is 2500. For NewsShows with only 
 *     1 or 2 queries, this number can be much smaller.
 * displayTime - This specifies the amount of time (in ms) to display each result before transition. 
 *     The default value is 7500.
 * transitionTime - This specifies the amount of time (in ms) to each transition takes to complete. 
 *     The default value is 400.
*/

google.load("elements", "1", {packages : ["newsshow"]});

function onLoad() {
  // Set the display time to 2 seconds, and transition time to 100 ms
  var options = {
    "queryList" : [
      {
        "title" : "Great Football",
        "q" : "USC Football"
      }
    ],
    "displayTime" : 2000,
    "transitionTime" : 100
  }
  var content = document.getElementById('content');
  var newsShow = new google.elements.NewsShow(content, options);
}

google.setOnLoadCallback(onLoad);