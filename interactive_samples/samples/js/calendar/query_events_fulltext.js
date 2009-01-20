/*
* Retrieve events with full text query
*/ 

// Create the calendar service object
var calendarService =
    new google.gdata.calendar.CalendarService('com.appspot.interactivesampler');

// The "public/full" feed is used to retrieve events from the named public
// calendar with full projection.
var feedUri = 'http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full';

// Full text query for this string
var searchText = 'Hackathon';

// Create a CalendarEventQuery, and specify that this query is 
// applied toward the "private/full" feed
var query = new google.gdata.calendar.CalendarEventQuery(feedUri);

// Set the query with the query text
query.setFullTextQuery(searchText);

// The callback method that will be called when getEventsFeed() returns feed data
var callback = function(root) {

  // Obtain the array of mateched CalendarEventEntry
  var eventEntries = root.feed.getEntries();
  
  // Output the query we're using
  var html  = '<p><strong>Full text query for:</strong> ' + searchText + '</p>';
  
  // If there is matches for the full text query
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
    // No match is found for the full text query
    html += '<p>No events are matched from the query!</p>';
  }
  
  // Output HTML and clear 'Loading...' message
  content.innerHTML = html;
}

// Error handler to be invoked when getEventsFeed() produces an error
var handleError = function(error) {
  content.innerHTML = '<pre>' + error + '</pre>';
}

// Submit the request using the calendar service object.  Notice the 
// CalendarEventQuery object is passed in place of the feed URI
calendarService.getEventsFeed(query, callback, handleError);