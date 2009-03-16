google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348', // Change this on your site
  onload: function() { initAllData(); }
});

function initAllData() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest("OWNER"), "owner_data");
  req.send(onData);
}

function onData(data) {
  if (!data.get("owner_data").hadError()) {
    var owner_data = data.get("owner_data").getData();
    document.getElementById("site-name").innerHTML = owner_data.getDisplayName();
  }
}