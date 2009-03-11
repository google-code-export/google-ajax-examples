/*
 * In this sample, we will check to see if you (the user) are signed in.
 * If you aren't, then we will provide a sign-in link.  Once logged in,
 * your name is displayed along with a log-out link
*/

google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348',
  version: '0.8',
  onload: function() { init(); }
});

function init() {
  // Create a request to grab the current viewer.
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest('VIEWER'), 'viewer_data');
  // Sent the request
  req.send(onData);
}

function onData(data) {
  // If the view_data had an error, then user is not signed in
  if (data.get('viewer_data').hadError()) {
    // Create the sign in link
    var options = {
      id: "content"
    };
    google.friendconnect.renderSignInButton(options);
  } else {
    var content = document.getElementById('content');
    // If the view_data is not empty, we can display the current user
    // Create html to display the user's name, and a sign-out link.
    var html = 'Welcome, ' + data.get('viewer_data').getData().getDisplayName();
    html += '<br><a href="#" onclick="google.friendconnect.requestSignOut()">Sign out</a>';
    content.innerHTML = html;
  }
}