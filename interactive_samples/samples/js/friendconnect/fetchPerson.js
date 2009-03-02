/*
 * This sample will show how to fetch a users data. It will grab the owner's name and display it.
 * The owner in this case is the site itself. However, you could query for specific users.
 * You can query for the owner, visitor, or a specific user by using their OpenSocial
 * ID string if you know it.  If you want to query the visitor, they must be signed in.
*/

google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348',
  version: '0.8',
  onload: function() { init(); }
});

function init() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.OWNER), 'owner');
  req.send(fetchPersonHandler);
}

function fetchPersonHandler(resp) {
  var content = document.getElementById('content');
  // use the key passed with the request to "get" the appropriate data
  var ownerResp = resp.get('owner');  

  // always verify whether your request was successful
  if (!ownerResp.hadError()) { 
    // store the opensocial.Person object representing the app's owner
    var owner = ownerResp.getData(); 
    // retrieve the name using the opensocial.Person object's getDisplayName() method
    content.innerHTML = 'Owner\'s name: ' + owner.getDisplayName();
  }
}