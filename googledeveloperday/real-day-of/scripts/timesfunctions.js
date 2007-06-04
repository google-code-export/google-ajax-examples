function processTimes(json) {
  for (var i = 0; i < json.feed.entry.length; i++) {
    var entry = json.feed.entry[i];
    var curdatetime = entry["gsx$curdatetime"].$t;
    var houroffset = parseInt(entry["gsx$houroffset"].$t);
    var curdatetimeArray = curdatetime.split(" ");
    var curdate = curdatetimeArray[0];
    var curtime = curdatetimeArray[1];
    var curdateArray = curdate.split("/");
    var curtimeArray = curtime.split(":");
    var key = entry["gsx$key"].$t;
    
    locations[key].currentDateTime = {
      hour: parseInt(curtimeArray[0]) + houroffset,
      minutes: parseInt(curtimeArray[1]),
      month: parseInt(curdateArray[0]),
      day: parseInt(curdateArray[1])
    }
  }

  updateTimeBasedInfo();  
}

function getActiveSession(locationNum) {
  var location = locations[locationNum];

  if (locations[locationNum].currentDateTime.day != 31) return;

  var hour = location.currentDateTime.hour;
  if (hour > 12) {
    hour = hour -12;
  } 

  var liveDecimal = hour + location.currentDateTime.minutes/60;
  var html = [];

  for (var sessionId in location.webcasts.sessions) {
    var session = location.webcasts.sessions[sessionId];
    var startDecimal = parseFloat(sessionId);
    var endDecimal = startDecimal + 1;

    if (startDecimal <= liveDecimal && endDecimal > liveDecimal) {
      for (var i = 0; i < session.length; i++) {
        html.push("<a href='http://google.client.shareholder.com/visitors/event/build2/mediapresentation.cfm?mediaid=" + session[i].link + "&player=1' target='_blank'>" + session[i].title + "</a>");
      }
      return { html: html.join(", "), sessionId: sessionId };
    }
  }
}

/**
 * Creates a script tag in the page that loads in the 
 * JSON feed for the specified key/ID. 
 * Once loaded, it calls processTimes.
 */
function getJSON() {
  var ssKey = "o16162288751915453340.3274641993991205664";
  var wsId = "od6";
  var callbackName = "processTimes"
  // Retrieve the JSON feed.
  var script = document.createElement('script');

  script.setAttribute('src', 'http://spreadsheets.google.com/feeds/list'
                         + '/' + ssKey + '/' + wsId + '/public/values' +
                        '?alt=json-in-script&callback=' + callbackName);
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}
