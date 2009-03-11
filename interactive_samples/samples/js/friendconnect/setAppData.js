google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348',
  version: '0.8',
  onload: function() { init(); }
});

function init() {
  var currentTime = new Date().toString();
  
  var req = opensocial.newDataRequest();
  req.add(req.newUpdatePersonAppDataRequest(opensocial.IdSpec.PersonId.VIEWER, 'time', currentTime));
  req.send(setTimeCallback);
}

function setTimeCallback(data) {
  if (data.hadError()) {
    var options = {
      id: "content"
    };
    google.friendconnect.renderSignInButton(options);
  } else {
    var content = document.getElementById('content');
    var html = 'The time has been stored. To view data, click below.<br/>';
    html += '<input type="button" onclick="retrieveData();" value="Retrieve Data" /><br/>';
    html += '<input type="button" onclick="init();" value="Store Time Again" /><br/>';
    html += '<a href="#" onclick="google.friendconnect.requestSignOut()">Sign out</a>';
    content.innerHTML = html;
  }
}

function retrieveData() {
  var req = opensocial.newDataRequest();
  var idspec = opensocial.newIdSpec({'userId':'VIEWER', 'groupId':'SELF'});

  req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), 'viewer');
  req.add(req.newFetchPersonAppDataRequest(idspec, 'time'), 'data');
  req.send(fetchAppDataHandler);
}

function fetchAppDataHandler(resp) {
  var viewerResp = resp.get('viewer');
  var dataResp = resp.get('data');

  if (!viewerResp.hadError() && !dataResp.hadError()) {
    var viewer = viewerResp.getData();
    var data = dataResp.getData();

    var viewerData = data[viewer.getId()];

    if (viewerData) {
      alert('The stored time is ' + viewerData['time']);
    }
  }
}