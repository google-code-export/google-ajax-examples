// pseudo-namespace
var CALENDARMAP_ADD = {

  /**
   * GData Calendar service object
   * @type google.gdata.calendar.CalendarService
   */
  calendarService: null,  

  /**
   * Map object for event location lookup
   * @type GMap2
   */
  map: null,

  /**
   * Geocoder to locate latitude and longitude of event
   * @type GClientGeocoder
   */
  geocoder: null,

  /**
   * latitude of event location
   * @type number
   */
  lat: null,

  /**
   * Longitude of event location
   * @type number
   */
  lng: null,

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_intro'
   * @type string
   */
  INTRO_DIV: '#add_intro',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_intro'
   * @type string
   */
  LOGIN_BUTTON: '#add_loginbutton',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_status'
   * @type string
   */
  STATUS_DIV: '#add_status',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_addcontent'
   * @type string
   */
  ADDCONTENT_DIV: '#add_addcontent',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_submitevent'
   * @type string
   */ 
  CREATE_EVENT_BUTTON: '#add_createevent',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_cancel'
   * @type string
   */ 
  CANCEL_BUTTON: '#add_cancel',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_startdate'
   * @type string
   */
  START_DATE: '#add_startdate',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_enddate'
   * @type string
   */
  END_DATE: '#add_enddate',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_starttime'
   * @type string
   */
  START_TIME: '#add_starttime',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_endtime'
   * @type string
   */
  END_TIME: '#add_endtime',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_allday'
   * @type string
   */
  ALL_DAY: '#add_allday',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventtitle'
   * @type string
   */
  EVENT_TITLE: '#add_eventtitle',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventtitle_missing'
   * @type string
   */
  EVENT_TITLE_MISSING: '#add_eventtitle_missing',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventcontent'
   * @type string
   */  
  EVENT_CONTENT: '#add_eventcontent',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventcontent_missing'
   * @type string
   */  
  EVENT_CONTENT_MISSING: '#add_eventcontent_missing',   

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventbldg'
   * @type string
   */   
  EVENT_BLDG: '#add_eventbldg',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventwhere'
   * @type string
   */   
  EVENT_WHERE: '#add_eventwhere',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventwhere_missing'
   * @type string
   */   
  EVENT_WHERE_MISSING: '#add_eventwhere_missing',
   
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_eventwhen_missing'
   * @type string
   */   
  EVENT_WHEN_MISSING: '#add_eventwhen_missing',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS class 'missing'
   * @type string
   */   
  MISSING_INDICATOR: '.missing',

  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_map'
   * @type string
   */   
  MAP_DIV: '#add_map',
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'add_geosearch'
   * @type string
   */   
  GEOSEARCH_BUTTON: '#add_geosearch',

  /**
   * This constant is used to initialize the GData Calendar service object
   * @type string
   */
  GDATA_SERVICE_ID: 'CODESITE_EVENT_ADD',

  /**
   * This is the constant cookie name that is used to for a saved 
   * event in-between AuthSub redirection
   * @type string
   */
  SAVED_EVENT_COOKIE: 'SAVE_EVENT_COOKIE',

  /**
   * Message display to users to indicate missing required fields before an 
   * event submission
   * @type string
   */
  MISSING_FIELDS: 'Missing required field(s).',

  /**
   * Message display to users to indicate an event submission is in progress
   * @type string
   */
  PROCESSING_REQUEST: 'Processing request, please wait ...',

  /**
   * Message display to users to indicate an event submission is completed
   * @type string
   */
  COMPLETE_REQUEST: 'Your event is added!',

  /**
   * Message display to Safari users that GData JS API does not support Safari
   * @type string
   */
  SAFARI_WARNING: 'Please use IE or Firefox to view this page.',

  /**
   * Message display to users to indicate the input location cannot be located
   * on map
   * @type string
   */
  LOCATION_NOT_FOUND: 'Cannot locate the input address on map.',


  /**
   * Message display to users to indicate the start/end date/time are valid
   * @type string
   */
  INVALID_DATE_TIME: 'Date/Time input(s) are invalid',

  /**
   * Developer key for the GMap API
   * @type string
   */
  
  // This is the key for http://code.google.com/events/calendar domain
  MAP_API_KEY: 'ABQIAAAArM7h3NX7hYkBySUFFdiEOhQRf2STcHXVuVmvt6wOtbdr4-n7NRTCVvmdDn_PrkyH8xOtGUESVEsrhA',  
  //MAP_API_KEY: 'ABQIAAAArM7h3NX7hYkBySUFFdiEOhTXgcnWInS6SUxJWNu1tHgPYn_KLRTz6_YV9rZt8stoyxlq9Lq909f97A',

  /**
   * Entry point after DOM is loaded.  Check to see if this is a token 
   * redirect, only preceed if this is a token redirect
   */   
  main: function() {  
    //jQuery(CALENDARMAP_ADD.ADDCONTENT_DIV).css({visibility: 'hidden'});
    //CALENDARMAP_ADD.initUI();
    google.gdata.client.init(function() {});
    CALENDARMAP_ADD.calendarService = new google.gdata.calendar.CalendarService(CALENDARMAP_ADD.GDATA_SERVICE_ID);

    if (CALENDARMAP_ADD.hasCalendarToken()) {
      CALENDARMAP_ADD.initUI();
      jQuery(CALENDARMAP_ADD.LOGIN_BUTTON).val('Logout');
    } else {
      jQuery(CALENDARMAP_ADD.ADDCONTENT_DIV).css({visibility: 'hidden'});
      jQuery(CALENDARMAP_ADD.LOGIN_BUTTON).val('Login');
    }

    jQuery(CALENDARMAP_ADD.LOGIN_BUTTON).click(function() {
      var token = google.accounts.user.checkLogin(CALENDARMAP.SCOPE_URL);
      if (token) {
        google.accounts.user.logout();
      } else {
        google.accounts.user.login(CALENDARMAP.SCOPE_URL);
      }
    });
  },

  /**
   * Initialization for UI and UI event handlers
   */ 
  initUI: function() {  

    jQuery(CALENDARMAP_ADD.ADDCONTENT_DIV).css({visibility: 'visible'});
    
    // Init create event button
    jQuery(CALENDARMAP_ADD.CREATE_EVENT_BUTTON).click(function() {          
      if (CALENDARMAP_ADD.checkRequired()) {

        if (CALENDARMAP_ADD.validateDateTime()) {          
          CALENDARMAP_ADD.submitEvent();
        } else {
          CALENDARMAP_ADD.indicateInvalidDateTime();
        }
      } else {
        CALENDARMAP_ADD.indicateMissingRequired();
        jQuery(CALENDARMAP_ADD.MISSING_INDICATOR).css({visibility: 'visible'});
      }
    });

    jQuery(CALENDARMAP_ADD.LOGIN_BUTTON).click(function() {          
      var token = google.accounts.user.checkLogin(CALENDARMAP.SCOPE_URL);
      if (token) {
        google.accounts.user.logout();
        init();
      } else {
        google.accounts.user.login(CALENDARMAP.SCOPE_URL);
      }
    });

    // Init datepicker
    jQuery(CALENDARMAP_ADD.START_DATE).datepicker({dateFormat: 'YMD-'}); 
    jQuery(CALENDARMAP_ADD.END_DATE).datepicker({dateFormat: 'YMD-'}); 
    CALENDARMAP_ADD.initTimeChooser();

    // init allday checkbox
    jQuery(CALENDARMAP_ADD.ALL_DAY).click(function() {
      var checked = jQuery(this).get(0).checked;
      
      if (checked) {
        jQuery(CALENDARMAP_ADD.START_TIME).css({display: 'none'});
        jQuery(CALENDARMAP_ADD.END_TIME).css({display: 'none'});
      } else {
        jQuery(CALENDARMAP_ADD.START_TIME).css({display: 'inline'});
        jQuery(CALENDARMAP_ADD.END_TIME).css({display: 'inline'});      
      }
    });
    
      
    // init map
    google.load('maps', '2', {callback: CALENDARMAP_ADD.setupMap});
  
  },

  /**
   * Redirect user to the referrer URL
   */
  redirectUrl: function() {
    var defaultRedirectUrl = '/events/calendar';

    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = defaultRedirectUrl
    }
  },

  /**
   * Indicate the start and end date are invalid
   */
  indicateInvalidDateTime: function() {
    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(
        CALENDARMAP_ADD.INVALID_DATE_TIME);
  },

  /**
   * Indicate to user that the input location cannot be located on map
   */
  indicateLocationNotFound: function() {
    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(
        CALENDARMAP_ADD.LOCATION_NOT_FOUND);
  },

  /**
   * Indicate to user that there are missing required fields
   */
  indicateMissingRequired: function() {
    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(
        CALENDARMAP_ADD.MISSING_FIELDS);
  },

  /**
   * Indicate to user that the script is currently processing this add
   * request, do not leave the page yet
   */
  indicateProcessing: function() {
    jQuery(CALENDARMAP_ADD.INTRO_DIV).css({display: 'none'}); 
    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(
        CALENDARMAP_ADD.PROCESSING_REQUEST);
  },

  /**
   * Indicate to user that the event has been added
   * @param {Object} event is the original submission event Object
   */
  indicateComplete: function(event) {

    var message = [];
    
    message.push(CALENDARMAP_ADD.COMPLETE_REQUEST);
    message.push('<br><br>');
    message.push('<div id=add_success>');
    message.push('&nbsp;&nbsp;&nbsp;' + event.title);
    message.push('<br>');
    message.push('&nbsp;&nbsp;&nbsp;' + event.where);
    message.push('</div>');

    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(message.join(''));
  },


  /**
   * Helper method to construct the dropdown time menu.
   * @param {string} timeValue is the time label of a valid time of the day.
   * @param {string} amOrPm indicates this an AM or PM time label.
   * @return {string} The created option html code representing the time label.
   */
  getTimeOption: function(timeValue, amOrPm) {

    var timeLabel = timeValue + amOrPm;

    var optionItem = [
      '<option value=',
      timeLabel,
      '>',
      timeLabel,
      '</option>'
    ].join('');

    return optionItem;
  },

  /**
   * Initialize the dropdown time menu, iteratively build the different time 
   * label options.
   */
  initTimeChooser: function() {
    
    var timeOption = null;
    
    for (var i=1; i <= 12 ; i++ ) {

      var time1 = CALENDARMAP_ADD.padZero(i) + ':00';
      var time2 = CALENDARMAP_ADD.padZero(i) + ':30';

      timeOption = jQuery(CALENDARMAP_ADD.START_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time1, 'am'));  

      timeOption = jQuery(CALENDARMAP_ADD.START_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time2, 'am'));      

      timeOption = jQuery(CALENDARMAP_ADD.END_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time1, 'am'));  
      timeOption = jQuery(CALENDARMAP_ADD.END_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time2, 'am'));  
    }

    for (var i=1; i <= 12 ; i++ ) {
      var time1 = CALENDARMAP_ADD.padZero(i) + ':00';
      var time2 = CALENDARMAP_ADD.padZero(i) + ':30';

      timeOption = jQuery(CALENDARMAP_ADD.START_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time1, 'pm'));  
      timeOption = jQuery(CALENDARMAP_ADD.START_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time2, 'pm'));      

      timeOption = jQuery(CALENDARMAP_ADD.END_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time1, 'pm'));  
      timeOption = jQuery(CALENDARMAP_ADD.END_TIME).
          append(CALENDARMAP_ADD.getTimeOption(time2, 'pm'));  
    }

    jQuery(CALENDARMAP_ADD.START_TIME).get(0).selectedIndex = 16;
    jQuery(CALENDARMAP_ADD.END_TIME).get(0).selectedIndex = 18;
  },

  /**
   * Submit an event to the GData server.
   * @param {Object} event is an object containing the details of an event.
   */
  submitEvent: function(event) { 

    CALENDARMAP_ADD.calendarService.getEventsFeed(
      CALENDARMAP.CAL_RW_URL, 
      function(root) {

        var title = jQuery(CALENDARMAP_ADD.EVENT_TITLE).val();
        var content = jQuery(CALENDARMAP_ADD.EVENT_CONTENT).val();
        var startDate = jQuery(CALENDARMAP_ADD.START_DATE).val();
        var endDate = jQuery(CALENDARMAP_ADD.END_DATE).val();
        var startTime = jQuery(CALENDARMAP_ADD.START_TIME).val();
        var endTime = jQuery(CALENDARMAP_ADD.END_TIME).val();
        var bldg = jQuery(CALENDARMAP_ADD.EVENT_BLDG).val();
        var where = jQuery(CALENDARMAP_ADD.EVENT_WHERE).val();
        var isAllDayEvent = jQuery(CALENDARMAP_ADD.ALL_DAY).get(0).checked;
        var referrer = document.referrer;

        if (CALENDARMAP_ADD.lat) {
          var lat = CALENDARMAP_ADD.lat;
          var lng = CALENDARMAP_ADD.lng;
        } else {
          var lat = '';
          var lng = '';       
        }  

        if (bldg != '') {
          where = bldg + ', ' + where;
        }  
        
        if (lat != '') {
          where = where + ' @ ' + lat + 
              ', ' + lng;
        }

        var startObject = null;
        var endObject = null;

        if (isAllDayEvent) {
          
          var start = startDate;   
          var end = endDate;
          
          startObject = google.gdata.DateTime.fromIso8601(start);
          endObject = google.gdata.DateTime.fromIso8601(end);
          
          var oneDay = 24 * 60 * 60 * 1000;

          endObject = new google.gdata.DateTime(
              new Date(endObject.getDate().getTime()+ oneDay));

          startObject.setDateOnly(true);
          endObject.setDateOnly(true);
          
        } else {     
          
          var startTimeLabel = CALENDARMAP_ADD.convertTimeLabel(startTime);
          var endTimeLabel = CALENDARMAP_ADD.convertTimeLabel(endTime);

          var userTzOffset = (new Date()).getTimezoneOffset() / 60;

          if (userTzOffset > 0) {
            userTzOffset = '-' + 
                CALENDARMAP_ADD.padZero(userTzOffset) + ':00'; ;
          } else {
            userTzOffset = '+' + 
                CALENDARMAP_ADD.padZero(userTzOffset) + ':00'; ;
          }

          var iCalStart = startDate + startTimeLabel + userTzOffset;     
          var iCalEnd = endDate + endTimeLabel + userTzOffset;

          startObject = google.gdata.DateTime.fromIso8601(iCalStart);
          endObject = google.gdata.DateTime.fromIso8601(iCalEnd);
        }    

        var gdataEvent = new google.gdata.calendar.CalendarEventEntry({
            title: {type: 'text', text: title},
            content: {type: 'html', text: content},
            locations: [
                {rel: 'g.event',
                label: 'Event location',
                valueString: where}],
            times: [
                {startTime: startObject,
                endTime: endObject}],
            participants: [
                {email: CALENDARMAP.CALENDAR_ID,
                rel: google.gdata.Who.REL_EVENT_ATTENDEE,
                valueString: CALENDARMAP.CALENDAR_ID,
                attendeeStatus: google.gdata.AttendeeStatus.VALUE_INVITED}]
        });
 
        root.feed.insertEntry(
          gdataEvent,
          function(root) {              
            
            var eventId = root.entry.id.getValue();            
            var eventIdRegex = /full\/([a-zA-Z0-9]+)$/;
            eventId.match(eventIdRegex);
            eventId = RegExp.$1;

            var currentPath = window.location.href;
            var lastSlash = currentPath.lastIndexOf('/');
            var redirectUrl = [currentPath.substr(0, (lastSlash+1)) + 'calendar.html#'];

            var start = startDate.replace(/-/g, '');
            var end = endDate.replace(/-/g, '');   

            redirectUrl.push('startdate=' + start);
            redirectUrl.push('&');
            redirectUrl.push('enddate=' + end);
            redirectUrl.push('&');
            redirectUrl.push('mode=WEEK');
            redirectUrl.push('&');
            redirectUrl.push('id=' + eventId);

            redirectUrl = redirectUrl.join('');   
            jQuery(CALENDARMAP_ADD.STATUS_DIV).html('Successfully created. <a href="' + redirectUrl + '">View on the calendar');
          },
          function(error) {
            CALENDARMAP_ADD.handleError(error, event);
          }          
        );
      }, 
      function(error) {
        CALENDARMAP_ADD.handleError(error, event);
      }
    );   
  },

  /**
   * Convert an ordinary time label (with AM/PM notifier) to military time 
   * format.
   * @param {string} timeLabel of a valid time label with AM/PM
   */
  convertTimeLabel: function(timeLabel) {  

    // sample match - "03:30pm"
    var regex = /^([0-9]{2}):([0-9]{2})(am|pm)$/;

    timeLabel.match(regex);

    var hour = parseInt(RegExp.$1, 10);
    var minute = RegExp.$2;  
    var amOrPm = RegExp.$3;

    var newTimeLabel = timeLabel;

    if (amOrPm == 'pm' && hour < 12) {
      hour = hour + 12;
    } 
   
    if (amOrPm == 'am' && hour >= 12) {
      hour = hour - 12
    }

    newTimeLabel = 'T' + CALENDARMAP_ADD.padZero(hour) + ':' 
        + minute + ':00:000';   

    return newTimeLabel;
  },

  /**
   * Check if there is a calendar AuthSub token for the current session
   * @return {boolean} True/false to indicate if there is a calendar AuthSub 
   * token
   */  
  hasCalendarToken: function() {
    if (google.accounts.user.checkLogin(
        CALENDARMAP.SCOPE_URL) === '') {
      return false;
    }
    return true;
  },

  /**
   * Detect whether the current session is a token redirect
   * @return {boolean} True/false to whether this is a redirect session
   */  
  isTokenRedirect: function() {
    
    var status = false;
    var url = window.location.href;
    var matchArr = url.match(/#2/);
    
    if (matchArr != null) {
      status = true;
    }

    return status;
  },

  /**
   * Error handler for JavaScript GData API calls, it is used as a callback
   * @param {Object} e is the error Object
   * @param {Object} event is the original submission event Object
   */
  handleError: function(e) {
    var errorMessage = e.cause ? e.cause.statusText : e.message;

    if (errorMessage.match(
        'You must be a calendar user to use private feeds')) {
      errorMessage = 'You must be a calendar user to submit an event';
    }
    
    errorMessage = 'Please try again.<br>Error: ' + errorMessage;

    jQuery(CALENDARMAP_ADD.STATUS_DIV).html(errorMessage);
  },

  /**
   * Padding a number with zero to ensure it has double digits
   * @param {number} number to be padded
   * @return {number} a padded number that has double digits
   */
  padZero: function(number) {
    if(number < 10) {
      number = 0 + '' + number;
    }      
    return number;
  },

  /**
   * Check whether the date/time inputs are valid.
   * It is invalid if -
   * 1) end date/time starts before start date/time
   * 2) end or start date/time is in the past
   * @return {boolean} whether the date/time inputs are valid
   */
  validateDateTime: function() {
    var success = true;

    var today = new Date();

    var startDate = jQuery.trim(jQuery(CALENDARMAP_ADD.START_DATE).val());
    var endDate = jQuery.trim(jQuery(CALENDARMAP_ADD.END_DATE).val());

    var startTime = jQuery.trim(jQuery(CALENDARMAP_ADD.START_TIME).val());
    var endTime = jQuery.trim(jQuery(CALENDARMAP_ADD.END_TIME).val());

    var isAllDayEvent = jQuery(CALENDARMAP_ADD.ALL_DAY).get(0).checked;

    if (isAllDayEvent) {
      startTime = '12:00pm';
      endTime = '12:00pm';
    }

    var startObject = CALENDARMAP_ADD.getDateObject(startDate, startTime);    
    var endObject = CALENDARMAP_ADD.getDateObject(endDate, endTime);       

    if (startObject.getTime() > endObject.getTime() || 
        today.getTime() > startObject.getTime() || 
        today.getTime() > endObject.getTime()) {
      success = false;
    }

    return success;
  },

  getDateObject: function(dateString, timeString) {

    // sample match - "2007-12-03"
    var dateRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;   
    dateString.match(dateRegex);

    var year = parseInt(RegExp.$1, 10);
    var month = parseInt(RegExp.$2, 10) - 1; 
    var date = parseInt(RegExp.$3, 10);
   
    // sample match - "03:30pm"
    var timeRegex = /^([0-9]{2}):([0-9]{2})(am|pm)$/;
    timeString.match(timeRegex);

    var hour = parseInt(RegExp.$1, 10);
    var minute = parseInt(RegExp.$2, 10);
    var amOrPm = RegExp.$3;

    if (amOrPm == 'pm' && hour < 12) {
      hour = hour + 12;
    } 
   
    if (amOrPm == 'am' && hour >= 12) {
      hour = hour - 12
    }    

    var dateObject = new Date(year, month, date, hour, minute, 00);

    return dateObject;
  },

  /**
   * Check the required user input fields to ensure that it has been filled
   * @return {boolean} whether all required fields currently have non-empty 
   * values
   */
  checkRequired: function() {
    
    var success = true;

    var title = jQuery(CALENDARMAP_ADD.EVENT_TITLE);
    var content = jQuery(CALENDARMAP_ADD.EVENT_CONTENT);
    var startDate = jQuery(CALENDARMAP_ADD.START_DATE);
    var endDate = jQuery(CALENDARMAP_ADD.END_DATE);
    var where = jQuery(CALENDARMAP_ADD.EVENT_WHERE);

    var titleMissing = jQuery(CALENDARMAP_ADD.EVENT_TITLE_MISSING);
    var contentMissing = jQuery(CALENDARMAP_ADD.EVENT_CONTENT_MISSING);
    var whenMissing = jQuery(CALENDARMAP_ADD.EVENT_WHEN_MISSING);
    var whereMissing = jQuery(CALENDARMAP_ADD.EVENT_WHERE_MISSING);

    jQuery(CALENDARMAP_ADD.MISSING_INDICATOR).
        css({visibility: 'hidden'});

    //blank all missing '*' notices
    titleMissing.empty();
    contentMissing.empty();
    whenMissing.empty();
    whereMissing.empty();

    if (!title.val()) {
      titleMissing.html('*');
      success = false;
    }
    if (!content.val()) {
      contentMissing.html('*');
      success = false;
    }
    if (!startDate.val() || !endDate.val()) {
      whenMissing.html('*');
      success = false;
    }
    if (!where.val()) {
      whereMissing.html('*');
      success = false;
    }

    return success;
  },

  /**
   * Initialize the GMap component for event location lookup
   */  
  setupMap: function() {
    CALENDARMAP_ADD.map = new GMap2(
        jQuery(CALENDARMAP_ADD.MAP_DIV).get(0));
    CALENDARMAP_ADD.map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    CALENDARMAP_ADD.map.addControl(new GSmallMapControl());
    CALENDARMAP_ADD.map.addControl(new GMapTypeControl());
    CALENDARMAP_ADD.geocoder = new GClientGeocoder();

    jQuery(CALENDARMAP_ADD.GEOSEARCH_BUTTON).click(
        CALENDARMAP_ADD.geocodeWhere); 

    if (jQuery(CALENDARMAP_ADD.EVENT_WHERE).val()) {
      jQuery(CALENDARMAP_ADD.GEOSEARCH_BUTTON).trigger('click');
    }
  },

  /**
   * Geocode the user input location onto the map
   */
  geocodeWhere: function() {
    if (CALENDARMAP_ADD.geocoder) {
      var address = jQuery(CALENDARMAP_ADD.EVENT_WHERE).val();
      CALENDARMAP_ADD.geocoder.getLatLng(
      address,
      function(point) {
        if (!point) {
          CALENDARMAP_ADD.indicateLocationNotFound();
        } else {
          CALENDARMAP_ADD.map.setCenter(point, 13);
          var marker = new GMarker(point, {draggable:true});
          CALENDARMAP_ADD.map.addOverlay(marker);

          GEvent.addListener(marker, 'dragend', function() {
            CALENDARMAP_ADD.lat = marker.getPoint().lat().toFixed(6);
            CALENDARMAP_ADD.lng = marker.getPoint().lng().toFixed(6);
            marker.openInfoWindow(
                '<span style="font-family:Arial, sans serif">' +
                'This location has been recorded. <br/>' + 
                'Drag marker to refine.</span>');
          });
          GEvent.trigger(marker, 'dragend');
        }
      }
      );
    }
  },

  /**
   * Detect whether user is using Safari
   * @return {boolean} a flag to indicate if the user is a Safari user
   */
  isSafariUser: function() {
    return jQuery.browser.safari;
  }

};
