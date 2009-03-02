/*
* This sample shows how to get all the profile fields supported in Friend Connect
* and list the specification fields supported by the container.
*/

google.friendconnect.container.setParentUrl('/' /* location of rpc_relay.html and canvas.html */);
google.friendconnect.container.loadOpenSocialApi({
  site: '16213644786251996348',
  version: '0.8',
  onload: function() { init(); } /* set the onload function */
});

function init() {
  // Create a request to grab the current viewer.
  // We use a params array to ask for all the available fields for the user
  // aboutMe and urls are friend connect specific fields and thus are not defined in the spec
  // They are described in the friend connect documentation
  // The list of friend connect specific field may grow: check the latest documentation.
  var params = {};
  params[opensocial.DataRequest.PeopleRequestFields.PROFILE_DETAILS] =
  [opensocial.Person.Field.PROFILE_URL, 'aboutMe', 'urls'];
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest('VIEWER', params), 'viewer_data');
  // Sent the request
  req.send(onData);
}

function onData(data) {
  var content = document.getElementById('content');

  // If the view_data had an error, then user is not signed in
  if (data.get('viewer_data').hadError()) {
    // Create the sign in link
    content.innerHTML = '<a href="#" onclick="google.friendconnect.requestSignIn()">Sign in</a>';
  } else {
    // If the view_data is not empty, we can display the current user
    // Create html to display the user's name, and a sign-out link.
    var viewer = data.get('viewer_data').getData();
    var html = 'Welcome, ' + viewer.getDisplayName();
    html += '<br><a href="#" onclick="google.friendconnect.requestSignOut()">Sign out</a>';
    html += '<br><br><a href="' +  viewer.getField(opensocial.Person.Field.PROFILE_URL) + '">';
    html += '<img src="' + viewer.getField(opensocial.Person.Field.THUMBNAIL_URL) + '"/></a>';    
    if (viewer.getField('aboutMe')) {
      html += '<br><a href="#" onclick="google.friendconnect.requestSettings()">About you</a>:  ';
      html += viewer.getField('aboutMe') + '<br/>';
    } else {
      html += '<br><a href="#" onclick="google.friendconnect.requestSettings()">';
      html += 'Add something about you!</a><br/>';
    }
    html += '<br>Urls about you from your profile:' + urlsAsList(viewer.getField('urls'));
    html += '<br>This container supports the following specification fields:<br/>opensocial.Person.Field.' + personFields();
    content.innerHTML = html;
  }
}

// General utility function to list fields from the spec that are supported by the container
function personFields() {
  var field;
  var supported = [];
  var env = opensocial.getEnvironment();
  var fields = [];
  for (field in opensocial.Person.Field) {
    fields.push(field);
    if (env.supportsField(opensocial.Environment.ObjectType.PERSON, opensocial.Person.Field[field])) {
      supported.push(field);
    }
  }
  return supported.join('<br/>opensocial.Person.Field.');
}

// This sample shows all the fields available to this date and how to get them
function urlsAsList(urls) {
  var list = ['<ul>'];
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    list.push('<li><a href="');
    list.push(url.getField('address'));
    list.push('">');    
    list.push(url.getField('linkText') ? url.getField('linkText') : 'No linkText Specified');
    list.push('</a>');
    if (url.getField('type').length > 0) {
      list.push(' Type: ');
      list.push(url.getField('type'));
    }
    list.push('</li>');
  }
  list.push('</ul>');
  return list.join('');
}