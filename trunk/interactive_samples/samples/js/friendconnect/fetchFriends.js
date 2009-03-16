/*
 * This sample shows how to grab all friends of a user.  For this sample, we will
 * grab all friends of OWNER, which in this case is the AJAX API Playground.
 * You can specify any opensocial id to grab the friends of.
*/

google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348', // Change this on your site
  onload: function() { init(); }
});

function init() {
  // Here is where we create the request to grab OWNER's friends
  var req = opensocial.newDataRequest();
  var idspec = opensocial.newIdSpec({'userId':'OWNER', 'groupId':'FRIENDS'});
  // Adding the specification of grabbing OWNER's friends to the request
  req.add(req.newFetchPeopleRequest(idspec), 'owner_friends');
  // Sending the request
  req.send(fetchPeopleHandler);
}

function fetchPeopleHandler(data) {
  // In this function, the request has returned
  var content = document.getElementById('content');
  
  // See if we have retrieved the owner's friends
  if (!data.get('owner_friends').hadError()) {
    // If we have, create an ordered list and insert each friend's name
    var ol = document.createElement('ol');
    var friends = data.get('owner_friends').getData();
    friends.each(function(friend) {
      var li = document.createElement('li');
      li.innerHTML = friend.getDisplayName();
      ol.appendChild(li);
    });
    content.appendChild(ol);
  } else {
    // If not, report the error.
    content.innerHTML = 'Error.';
  }
}