// pseudo-namespace
var CALENDARMAP_CALENDARVIEW = {
  
  /**
   * This constant is used for the jQuery to reference the 
   * CSS ID 'embedded_cal'
   * @type string
   */
  EMBEDDED_CAL: '#calendar_embedded',  

  /**
   * UI event handlers initialization
   */ 
  init: function() {
    CALENDARMAP_CALENDARVIEW.refreshEmbedCal();
  },

  /**
   * Refresh the embeddable calendar based on the checkbox options
   */ 
  refreshEmbedCal: function() {

    var newUrl = 
    'http://www.google.com/calendar/embed?showTitle=0&chrome=NAVIGATION&height=588';

    newUrl += '&src=' +  CALENDARMAP.CALENDAR_ID + 
      '&color=%23' + CALENDARMAP.CALENDAR_COLOR; 

    // Determine if this is a redirect after a newly added event, if so
    // display the embed cal on the week range which teh new event is on
    var params = CALENDARMAP.getUrlArgs();    
    if (params.startdate && params.enddate) {
      newUrl += '&dates=' + params.startdate;

      if (params.startdate == params.enddate) {
        // Handle this special case
        var dateRegex = /^([0-9]{4})([0-9]{2})([0-9]{2})$/;
        params.startdate.match(dateRegex);

        var year = parseInt(RegExp.$1, 10);
        var month = parseInt(RegExp.$2, 10) - 1;
        var date = parseInt(RegExp.$3, 10);

        var oneDay = 24 * 60 * 60 * 1000;

        var dateObject = new Date(year, month, date);
        dateObject = new Date(dateObject.getTime() + oneDay);

        year = dateObject.getFullYear().toString();
        month = CALENDARMAP_CALENDARVIEW.padZero(dateObject.getMonth() + 1).toString();
        date = CALENDARMAP_CALENDARVIEW.padZero(dateObject.getDate()).toString();

        params.enddate = year + month + date;
      }

      newUrl += '%2F' + params.enddate;
    }
    if (params.mode) {
      newUrl += '&mode=' + params.mode;
    }    

    jQuery(CALENDARMAP_CALENDARVIEW.EMBEDDED_CAL).get(0).src = newUrl;
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
  }
};

jQuery(document).ready(function() {
  CALENDARMAP_CALENDARVIEW.init();
});
