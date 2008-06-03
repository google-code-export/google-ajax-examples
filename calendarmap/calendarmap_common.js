// pseudo-namespace

var CALENDARMAP = {
  
  /**
   * This is the constant scope URL to be used for GData AuthSub
   * @type string
   */
  SCOPE_URL: 'http://www.google.com/calendar/feeds/',

  /**
   * This is the constant read/write feed URL to be used for GData opertions
   * @type string
   */
  CAL_RW_URL: 
      'http://www.google.com/calendar/feeds/default/private/full',

  /**
   * This is the constant calendar ID for the calendar to invite.
   * @type string
   */
  CALENDAR_ID: 'd4gpa1ku68edd0kepf3tsj86ts@group.calendar.google.com',  

  /**
  * @type String
  */
  CALENDAR_COLOR: '#ff0000',

  /**
   * Grab and parse the arguments of the URL after '#'
   * @return {Object} An object that maps all the argument names and values
   */ 
  getUrlArgs: function() {
    var args = new Object();    
    var params = window.location.href.split('#');

    if (params.length > 1) {
      params = params[1];
      var pairs = params.split("&");
      for ( var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if ( pos == -1 ) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = value.replace(/\+/g, " ");
        args[argname] = value;
      }
    }
    return args;
  },

  /**
   * Formats a date in the form of HH:MM am/pm
   * @param {Date} date
   * @return {string}
  */
  formatTime: function(date) {
    var hour = date.getHours();
    var min = date.getMinutes();
    var ampm = hour < 12 ? 'am' : 'pm';
    var h = "" + (hour % 12 || 12);
    var m = (min < 10 ? "0" : "") + min;
    return h + ":" + m + ampm;
  },

  /**
   * Formats a date as a UTC date string,
   * for use in the add-to-calendar link.
   * @param {Date} timeObj
   * @return {string}
  */
  getUTCDateString: function(timeObj) {
    var dateStr = "" + timeObj.getUTCFullYear();
    dateStr += CALENDARMAP.stringPad(timeObj.getUTCMonth()+1);
    dateStr += CALENDARMAP.stringPad(timeObj.getUTCDate());
    dateStr += "T" + CALENDARMAP.stringPad(timeObj.getUTCHours());
    dateStr += CALENDARMAP.stringPad(timeObj.getUTCMinutes()) + "00Z";
    return dateStr;
  },

  /**
   * Add a leading '0' if string is only 1 char
   * @param {string} str
   * @return {string}
  */
  stringPad: function(str) {
    var newStr = "" + str;
    if (newStr.length == 1) {
      newStr = "0" + newStr;
    }
    return newStr;
  },

  /**
   * Adds a 0 to single digits.
   * @param {number} n
   * @return {string}
   */
  zeroPad: function(n) {
    return (n < 10) ? '0' + n : n;
  },

  /**
   * Formats the date in a send-to-calendar friendly way.
   * @param {Date} date
   * @return {string}
  */
  dateToEventPageDate: function(date, isAllDay) {
    if (!date) return ""; // zero recurrence event
    if (isAllDay) {
      return "" + date.getFullYear() + CALENDARMAP.zeroPad(date.getMonth() + 1) +
           CALENDARMAP.zeroPad(date.getDate());
    } else {
      return CALENDARMAP.getUTCDateString(date);
    }
  }

};

google.load("jquery", "1.2.6");
