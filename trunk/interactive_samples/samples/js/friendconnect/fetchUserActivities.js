/*
 * This sample shows how to display the viewers activities.  That means when
 * running this code, the user must be logged in.
*/

google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348',
  version: '0.8',
  onload: function() { init(); }
});

function init() {
  var req = opensocial.newDataRequest();
  var idspec = opensocial.newIdSpec({'userId':'VIEWER', 'groupId':'SELF'});
  // Create a request for the Viewer's activities
  req.add(req.newFetchActivitiesRequest(idspec), 'viewerActivities');
  req.send(fetchActivitiesHandler);
}

function fetchActivitiesHandler(resp) {
  var content = document.getElementById('content');
  var viewerActivities = resp.get('viewerActivities');
  // You can verify whether the user is logged in by how many activities there are.
  if (viewerActivities.getData()) {
    // If the user is logged in, get the activities as an array.
    var activities = viewerActivities.getData().asArray();
    var html = '';
    for (var i = 0; i < activities.length; i++) {
      // Loop through the array and add the title and body fields to the outputted HTML.
      var title = activities[i].getField('title', {escapeType: 'none'});
      var body = activities[i].getField('body', {escapeType: 'none'});
      html = '<br/>' + title + body;
    }
    // Add a logout link.
    html += '<br/><a href="#" onclick="google.friendconnect.requestSignOut()">Sign out</a>';
    content.innerHTML = 'Viewer\'s activities: ' + html;
  } else {
    // If the user isn't logged in, add a login link.
    content.innerHTML = '<a href="#" onclick="google.friendconnect.requestSignIn()">Sign in</a>';
  }
}