google.load("gdata", "1");
google.load("maps", "2");

// pseudo-namespace
var CALENDARMAP_MAPVIEW = {
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'map_map'
   * @type string
   */
  MAP: '#map_map',  

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'map_map'
   * @type string
   */
  SIDEBAR: '#map_sidebar',  

  init: function() {
    var feedUrl = 'http://www.google.com/calendar/feeds/' + CALENDARMAP.CALENDAR_ID +
         '/public/full?futureevents=true&orderby=starttime&sortorder=ascending&singleevents=true';
    new CalendarMap(CALENDARMAP_MAPVIEW.MAP, CALENDARMAP_MAPVIEW.SIDEBAR, [feedUrl]);
  }
};

/**
 * Creates the map and calls function to load in calendar feeds.
 * @param {string} mapId Identifies the DOM node to hold the map
 * @param {string} sidebarId Identifies the DOM node to hold sidebar
 * @param {Array} feeds Holds urls for RSS feeds to load
 * @constructor
*/
CalendarMap = function(mapId, sidebarId, feeds) {
  if (GBrowserIsCompatible()) {
    this.mapId_ = mapId;
    this.sidebarId_ = sidebarId;
    this.feeds_ = feeds;
    this.locations_ = {};
    this.entries_ = [];
    this.createdEntry_ = null;

    this.map_ = new google.maps.Map2(jQuery(this.mapId_).get(0));
    this.map_.setCenter(new google.maps.LatLng(2, -55), 1);
    this.map_.addControl(new google.maps.LargeMapControl());
    this.map_.addControl(new google.maps.MapTypeControl());
    this.loadCalendarFeeds_();
  } 
};

/**
 * Initializes member vars
 */
CalendarMap.prototype = {
  map_: null,
  locations_: null,
  entries_: null,
  numLoaded_: 0,
  currentEntry_: null
};

CalendarMap.COLORS = {
  HOVER : '#EFF5FF',
  SELECTED : '#E5ECF9'
};

/**
 * Loads the two calendar feeds.
 * @private
 */
CalendarMap.prototype.loadCalendarFeeds_ = function() {               
  var me = this;
  google.gdata.client.init(function (str) {});

  var myService = new google.gdata.calendar.CalendarService('code-calmap');
  for (var i = 0; i < this.feeds_.length; i++) {
    myService.getEventsFeed(this.feeds_[i], function(feedRoot) {
        me.handleFeed_(feedRoot)}, null);
  }
}

/**
 * Callback function for loaded feed.
 * Adds result entries to global entries array,
 * and calls parseEntries if both feeds have returned.
 * @param {Object} feedRoot
 * @private
 */
CalendarMap.prototype.handleFeed_ = function(feedRoot) {
  this.numLoaded_++;
  var feedEntries = feedRoot.feed.getEntries();
  for (var i = 0; i < feedEntries.length; i++) {
    this.entries_.push(feedEntries[i]);
  } 
  if (this.numLoaded_ == this.feeds_.length) {
    this.entries_.sort(this.dateSort_);
    this.parseEntries_();
  }
} 
   
/**
 * Used to sort an array of event entry objects by their
 * start time. Compares a to b.
 * @param {Object} a A google.gdata.When object
 * @param {Object} b A google.gdata.When object
 * @return {number}
 */
CalendarMap.prototype.dateSort_ = function(a, b) {
  var aStart = a.getTimes()[0].getStartTime();
  var bStart = b.getTimes()[0].getStartTime();
     
  var aStartDate = aStart.getDate();
  var bStartDate = bStart.getDate();
  var isLater = (aStartDate.getTime() - bStartDate.getTime());
  return isLater;
}

/**
 * Parses array of entry objects. Creates a hash based on their 
 * latlng, checks if that location already exists in locations based
 * on hash, creates location object if needed, and adds entry to location.
 * Populates sidebar and calls function to create markers.
 * @private
 */
CalendarMap.prototype.parseEntries_ = function() {
  // setup checkbox handlers
  var me = this;

  for (var i = 0; i < this.entries_.length; i++) {           
    var entry = this.entries_[i];
    var pattern = new RegExp(/@\s*([\-0-9.]+)\s*,\s*([\-0-9.]+)\s*/);
    if (entry.getLocations().length == 0) continue;
    var matches = pattern.exec(entry.getLocations()[0].getValueString());
    if (matches != null) {
      var lat = parseFloat(matches[1]);
      var lng = parseFloat(matches[2]); 
      var latlng = new GLatLng(lat, lng);
      var latlngHash = (lat + "" + lng);
      latlngHash = latlngHash.replace(".","").replace(".", "").replace("-","");
      if (this.locations_[latlngHash] == null) {
        this.locations_[latlngHash] = {};
        this.locations_[latlngHash]["entries"] = [];
      }
      this.locations_[latlngHash]["latlng"] = latlng;
      this.locations_[latlngHash]["entries"].push(entry);
      
      var sidebarEntry = this.createSidebarEntry_(entry, latlngHash);
      jQuery(this.sidebarId_).append(sidebarEntry.get(0));
    }
  }
  this.createMarkers_();
}


/**
 * Creates sidebar entry div.
 * @param {Object} entry A google.gdata.EventEntry object
 * @param {string} latlngHash The identifying hash of the associated location
 * @return {Element} The created div
 */
CalendarMap.prototype.createSidebarEntry_ = function(entry, latlngHash) {
  var me = this;

  var className = 'cm_comm';
  var sidebarEntry = jQuery('<div class="' + className + '"></div>');
  sidebarEntry.css({cursor: 'pointer', padding: '5px'});
  var location = entry.getLocations()[0].getValueString();
  var color = CALENDARMAP.CALENDAR_COLOR;
  location = location.substr(0, location.indexOf('@'));
  sidebarEntry.html('<span style="color: #' + color + '">' + 
     entry.getTitle().getText() + '</span><br/>' + 
     '(' + this.getStartDateTime_(entry) + ' - ' + location + ')');

  sidebarEntry.mouseup(function() {
    GEvent.trigger(me.locations_[latlngHash].marker, "click");
    if (me.currentEntry_) {
      me.currentEntry_.css({backgroundColor: '#fff'});
    }
    sidebarEntry.css({backgroundColor: CalendarMap.COLORS.SELECTED});
    me.currentEntry_ = sidebarEntry;
  });

  sidebarEntry.mouseover(function() {
    sidebarEntry.css({backgroundColor: CalendarMap.COLORS.HOVER});
  });

  sidebarEntry.mouseout(function() {
    sidebarEntry.css({backgroundColor: '#fff'});
  });

  // Get entry ID from URL (if there) and set selected if matches
  var params = CALENDARMAP.getUrlArgs();
  if (params.id && entry.getId().getValue().indexOf(params.id) != -1) {
    me.createdEntry_ = sidebarEntry;
  }

  return sidebarEntry;
}


/**
 * Creates markers from all the locations.
 * Each location may have multiple events associated with it,
 * and their info is put in the info windows.
 * @private
 */
CalendarMap.prototype.createMarkers_ = function() {
  for (var latlngHash in this.locations_) {
    var location = this.locations_[latlngHash];
    var html = [];
    for (var i = 0; i < location.entries.length; i++) {
      var entry = location.entries[i];
      var link = entry.getLink("alternate").getHref();
      var linkText = this.getStartDateTime_(entry) + ' ' +  
          entry.getTitle().getText();
      var className = 'cm_comm';
      var color = CALENDARMAP.CALENDAR_COLOR;
      html.push('<div class="' + className + '">' + this.getAddEventHtml_(entry) 
         + ' <a style="color: #' + color + '" ' + 'target="_blank" href="' 
         + link + '"> ' + linkText + '</a></div>');
    }
    var icon = new google.maps.Icon(G_DEFAULT_ICON);
    if (location.entries.length > 1) {
      icon.image = 'images/marker_bigblue.png';
    } else {
      icon.image = 'images/marker_smallblue.png';
      icon.iconSize = new google.maps.Size(15, 26);
      icon.shadowSize = new google.maps.Size(30, 26);
    }
    location.marker = this.createMarker_(location, icon, html.join(""));
    this.map_.addOverlay(location.marker);
  }
  if (this.createdEntry_ != null) {
    this.createdEntry_.mouseup();
  }
}


/**
 * Creates a marker for the given location.
 * @param {Object} location Contains the event info & GLatLng
 * @param {GIcon} icon The icon for this location marker
 * @param {string} html The list of events here
 * @return {GMarker} The created marker
 * @private
 */
CalendarMap.prototype.createMarker_ = function(location, icon, html) {
  var opts = {icon: icon, zIndexProcess: this.importanceOrder_};
  var marker = new google.maps.Marker(location.latlng, opts);
  marker.importance = location.entries.length;

  var eventsList = jQuery('<div></div>');
  eventsList.html(html);
   
  var zoomLink = jQuery('<a></a>');
  zoomLink.attr({href: '#'});
  zoomLink.append('(Click to Zoom)');

  var me = this;
  jQuery(zoomLink).click(function() {
    me.map_.setCenter(location.latlng, 13);
  });

  var infoContent = jQuery('<div></div>');
  infoContent.css({padding: '10px'});
  infoContent.append('Events here: ');
  infoContent.append(zoomLink);
  infoContent.append(eventsList);

  GEvent.addDomListener(marker, 'click', function() {
    marker.openInfoWindow(infoContent.get(0), {autoScroll: true, maxHeight: 200});
  });

  return marker;
}

/**
 * Used as the zIndexProcess function for deciding which 
 * markers are layered on top of one another.
 * This puts markers with more events on top of those with less events.
 * @param {GMarker} marker
 * @param {Object} b Unknown
 * @return {number}
 * @private
 */
CalendarMap.prototype.importanceOrder_ = function(marker,b) {
  return GOverlay.getZIndex(marker.getPoint().lat()) + marker.importance*1000000;
}


/**
 * Returns the HTML for button link that adds to Google Calendar when clicked 
 * @param {Object} entry A google.gdata.EventEntry object
 * @return {string}
 * @private
 */
CalendarMap.prototype.getAddEventHtml_ = function(entry) {
  var location = entry.getLocations()[0].getValueString();
  
  var start = entry.getTimes()[0].getStartTime();
  var end = entry.getTimes()[0].getEndTime();
  var isAllDay = start.isDateOnly();
  var dates = CALENDARMAP.dateToEventPageDate(start.getDate(), isAllDay) + '/' +
              CALENDARMAP.dateToEventPageDate(end.getDate(), isAllDay);

  // From http://www.google.com/googlecalendar/event_publisher_guide.html:
  // event page expects something like 20070205T071500Z/20070203T083000Z
  var url = "http://www.google.com/calendar/event?action=TEMPLATE" +
            "&text=" + encodeURIComponent(entry.getTitle().getText()) +
            "&dates=" + dates + "&location=" + location;
  return '<a href="' + url + '" target="_BLANK" ' +
      'title="Add this event to Google Calendar">' +
      '<img src="/images/addtocal.gif" style="border:0px">' + '</a>';
}

  
/**
 * Get the start date in "4/19 7:05pm" format 
 * @param {Object} entry A google.gdata.EventEntry object
 * @return {string}
 * @private
 */
CalendarMap.prototype.getStartDateTime_ = function(entry) {
  var startTime = entry.getTimes()[0].getStartTime();
  var isAllDay = (startTime.isDateOnly());
  var startTimeDate = startTime.getDate();
  var dateStr = (startTimeDate.getMonth() + 1) + '/' + startTimeDate.getDate();
  if (isAllDay) {
    return dateStr;
  } else {
    return dateStr + ' ' + CALENDARMAP.formatTime(startTimeDate);
  }
}


