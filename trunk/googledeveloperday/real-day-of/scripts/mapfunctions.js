var devdayMap = {
  map: null,
  icon: null,
  slideshow: null
};

// Load in the feeds API
google.load("feeds", "1");

/**
 * Loads map and calls function to load in worksheet data.
 */
function loadDevDayMap() {

  if (GBrowserIsCompatible()) {
    // create the map
    devdayMap.map = new GMap2(document.getElementById("cm_map"));
    devdayMap.map.addControl(new GSmallZoomControl());
    devdayMap.map.setCenter(new GLatLng(22, 3), 1);
    devdayMap.map.setMapType(G_SATELLITE_TYPE);

    devdayMap.icon = new GIcon(G_DEFAULT_ICON);
    devdayMap.icon.image = "images/green.gif";
    devdayMap.icon.shadow = "http://www.google.com/mapfiles/shadow50.png";
    devdayMap.icon.iconSize = new GSize(20, 34);
    devdayMap.icon.shadowSize = new GSize(37, 34);
    devdayMap.icon.infoWindowAnchor = new GPoint(13, 19);
    devdayMap.icon.infoShadowAnchor = new GPoint(18, 25);

    loadMarkers();
    getJSON();

    var mapPos = getElementPosition(devdayMap.map.getContainer());
    document.getElementById('infoLightBox').style.left = mapPos.left;
    document.getElementById('infoLightBox').style.top = mapPos.top + 50;
  } else {
    alert("Sorry, the Google Maps API is not compatible with this browser");
  }
}

/**
 * Gets position of element
 * @param {Object} element
 * @return {Object} Describes position
 */
function getElementPosition(element) {
  var leftPos = element.offsetLeft;   // initialize var to store calculations
  var topPos = element.offsetTop;     // initialize var to store calculations
  var parElement = element.offsetParent;  // identify first offset parent element  
  while (parElement != null ) {       // move up through element hierarchy
    leftPos += parElement.offsetLeft;  // appending left offset of each parent
    topPos += parElement.offsetTop;  
    parElement = parElement.offsetParent;  // until no more offset parents exist
  }
  return {left: leftPos, top: topPos};
}


function updateTimeBasedInfo() { 
  updateMarkerColors();
  //displayNowShowing();
}

function loadMarkers() {
  for (var locationKey in locations) {
    var location = locations[locationKey];
    var point = new GLatLng(location.lat,location.lng);
    var html = "<div style='font-size:12px'>";
    html += "<strong>" + location.office + "</strong>";
    html += "<br/><br/>" + location.address;
    html += "</div>";
    html += "<div id='slideshow' class='gss'>Loading...</div>";
      
    // create the marker
    var marker = createMarker(point, location.office, html, locationKey);
    devdayMap.map.addOverlay(marker);
    locations[locationKey].marker = marker;
  }

}

/**
 * Creates marker with ranked Icon or blank icon,
 * depending if rank is defined. Assigns onclick function.
 * @param {GLatLng} point Point to create marker at
 * @param {String} title Tooltip title to display for marker
 * @param {String} html HTML to display in InfoWindow
 * @param {Number} num Number of marker in locations array
 * @return {GMarker} Marker created
 */
function createMarker(point, title, html, key) {
  var markerOpts = {};
  var icon = new GIcon(devdayMap.icon);
  markerOpts.icon = icon;
  markerOpts.title = title;

  var marker = new GMarker(point, markerOpts);
  marker.key = key;

  GEvent.addListener(marker, "click", function() {
   loadSlideshow(locations[marker.key].photoFeed);
   loadBlogFeed(title, locations[marker.key].blogFeed, locations[marker.key].blogTag);
   document.getElementById('infoLightBox').style.visibility = 'visible';
  });


  return marker;
}

function loadBlogFeed(title, blogFeed, blogTag) {
  document.getElementById('sideInfoBoxMain').innerHTML = "<strong>" + title + "</strong>";
   +  'Loading blog feed...';
  var feed = new google.feeds.Feed(blogFeed);

  feed.load(function(result) {
    if (!result.error) {
      var container = document.getElementById("sideInfoBoxMain");
      container.innerHTML = "<strong>" + title + "</strong><br/><br/>";
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        container.innerHTML += "<a href='" + 
          entry["link"] + "' target='_blank'>" + entry["title"] + "</a><br/><br/>";
      }
      document.getElementById('sideInfoBoxFooter').innerHTML = "<a href='http://blogsearch.google.com/blogsearch?q=gdd07' target='_blank'>Read more blog posts</a>.";
    }
  });
}

function updateMarkerColors() {
  var devDate = 31;
  
  for (var locationKey in locations) {
    var location = locations[locationKey];
    
    var colored = false; 
    if (location.currentDateTime.day == devDate) {
      if (location.currentDateTime.hour >= location.startTime) {
        if (location.currentDateTime.hour < location.endTime) {
          location.marker.setImage("images/animated.gif");
          colored = true;
        } else {
          location.marker.setImage("images/red.gif");
          colored = true;
        }
      }
    } else if (location.currentDateTime.day > devDate) {
      location.marker.setImage("images/red.gif");
      colored = true;
    }

    if (!colored) {
      location.marker.setImage("images/green.gif");
    }
  }
  setTimeout(getJSON, 900000);
}

function loadSlideshow(feedUrl) {
  var options = {
    displayTime: 2000,
    transistionTime: 600,
    pauseOnHover: false,
    linkTarget : google.feeds.LINK_TARGET_BLANK,
    thumbnailSize : GFslideShow.THUMBNAILS_MEDIUM
  };
  document.getElementById('slideshow').style.width = '288px';
  document.getElementById('slideshow').style.height = '216px';
  if (devdayMap.slideshow) {
    devdayMap.slideshow.cleanup();
  }
  devdayMap.slideshow = new GFslideShow(feedUrl, "slideshow", options);
}

function closeInfoLightBox() { 
  document.getElementById('infoLightBox').style.visibility = 'hidden';
  document.getElementById('slideshow').style.width = '0px';
  document.getElementById('slideshow').style.height = '0px';
}


function displayNowShowing() {
  var nowShowingDiv = document.getElementById("nowShowingDiv");
  var londonHour = locations["uk"].currentDateTime.hour;
  var shouldShow = false;

  if (londonHour < locations["uk"].webcasts.startTime) {
   nowShowingDiv.innerHTML = (locations["uk"].webcasts.startTime-londonHour) + " Hours until Live Streaming from London!";
   shouldShow = true;
  }

  var mvResult = getActiveSession("mv");
  var ukResult = getActiveSession("uk");  
  if (mvResult) {
    nowShowingDiv.innerHTML = "Now Streaming Live Sessions: " + mvResult.html;
    shouldShow = true;
  }
      
  if (ukResult) { 
    nowShowingDiv.innerHTML = "Now Streaming Live Session: " + ukResult.html;
    shouldShow = true;
  }
  
  if (shouldShow) {
    nowShowingDiv.style.display = 'block';
  } else {
    nowShowingDiv.style.display = 'none';
  }
}

