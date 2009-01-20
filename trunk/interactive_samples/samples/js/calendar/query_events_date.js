/*
* Retrieve events with a date query
*/ 

// Create the calendar service object
var calendarService =
    new google.gdata.calendar.CalendarService('com.appspot.interactivesampler');

// The "public/full" feed is used to retrieve events from the named public
// calendar with full projection.
var feedUri = 'http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full';

// Create a CalendarEventQuery, and specify that this query is 
// applied toward the "private/full" feed
var query = new google.gdata.calendar.CalendarEventQuery(feedUri);

// Create and set the minimum and maximum start time for the date query
var startMin = google.gdata.DateTime.fromIso8601('2008-01-01T00:00:00.000-08:00');
var startMax = google.gdata.DateTime.fromIso8601('2008-07-01T00:00:00.000-08:00');
query.setMinimumStartTime(startMin);
query.setMaximumStartTime(startMax);

// The callback that will be called when getEventsFeed() returns feed data
var callback = function(root) {

  // Obtain the array of matched CalendarEventEntry
  var eventEntries = root.feed.getEntries();

  // Print the query parameters
  var fromDate = google.gdata.DateTime.toIso8601(startMin);
  var toDate = google.gdata.DateTime.toIso8601(startMax);
  var html  = '<p><strong>Date query:</strong> ' + fromDate + ' - '
            + toDate + '</p>';

  // If there is matches for the date query
  if (eventEntries.length > 0) {
    html += '<ul>';
    for (var i = 0; i < eventEntries.length; i++) {
      var event = eventEntries[i];
      // Print the event title of the matches
      html += '<li><strong>Event title:</strong> '
            + event.getTitle().getText() + '</li>';
    }
    html += '</ul>';
  } else {
    // No match is found for the date query
    html += '<p>No events are matched from the query!</p>';
  }
  
  // Output HTML and clear 'Loading...' text
  content.innerHTML = html;
}

// Error handler to be invoked when getEventsFeed() produces an error
var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
}

// Submit the request using the calendar service object. Notice the CalendarEventQuery 
// object is passed in place of the feed URI
calendarService.getEventsFeed(query, callback, handleError);
