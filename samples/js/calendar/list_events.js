/*
* Retrieve all events
*/

// Obtain a reference to the 'content' div
var content = document.getElementById('content');

// Create the calendar service object
var calendarService =
    new google.gdata.calendar.CalendarService('com.appspot.interactivesampler');

// The "public/full" feed is used to retrieve events from the named public
// calendar with full projection.
var feedUri = 'http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full';

// The callback method that will be called when getEventsFeed() returns feed data
var callback = function(result) {

  // Obtain the array of CalendarEventEntry
  var entries = result.feed.entry;

  // Print the total number of events
  var html = '<p>Total of ' + entries.length + ' event(s)</p>';

  html += '<ul>';
  for (var i = 0; i < entries.length; i++ ) {
    var eventEntry = entries[i];
    var eventTitle = eventEntry.getTitle().getText();
    html += '<li><strong>Event title:</strong> ' + eventTitle + '</li>';
  }
  html += '</ul>';

  // Output HTML and clear 'Loading...' screen
  content.innerHTML = html;
};

// Error handler to be invoked when getEventsFeed() produces an error
var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
};

// Submit the request using the calendar service object
calendarService.getEventsFeed(feedUri, callback, handleError);