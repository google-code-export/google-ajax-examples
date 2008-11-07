  window.markers = {};

  google.load("maps", "2");
  google.setOnLoadCallback(init);

  function init() {    
    
    var installMsg = 'Please install Google Gears first to use Geolocation API.';
    var permissionMsg = 'This web application uses Geolocation API of Google Gears.  Is this okay?';

    if (!gearsutil.isGearsInstalled()) {      
      // do not have Gears installed
      gearsutil.defaultNoGears(installMsg);
      return;
    }

    var success = gearsutil.requestGearsForLocation(permissionMsg);

    if (!success) {
      // has Gears, but no permission
      gearsutil.defaultNoPermission();
      return;
    }
  
    console.log(google.gears.factory.getBuildInfo());
    
    window.geo = google.gears.factory.create('beta.geolocation');   
    
    getCurrentLocation();

    jQuery('#search').click(function() {
      var input = jQuery('#input').val();
      geoSearchYouTube('youtubeCallback', [input], window.lat, window.lng);
      showLoading();
    });
    
    jQuery('#quickies input').click(function() {
      var input = jQuery(this).val(); 
      geoSearchYouTube('youtubeCallback', [input], window.lat, window.lng);
      showLoading();
    });

  }
  
  function initMap() {
    window.map = new google.maps.Map2(document.getElementById("map"));
    map.setCenter(new google.maps.LatLng(window.lat, window.lng), 15);

    map.addControl(new GLargeMapControl());
    map.addControl(new GMapTypeControl());

    var icon = new GIcon(G_DEFAULT_ICON);
    icon.image = "http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";
    markerOptions = {icon: icon};

    var home = new GLatLng(window.lat, window.lng);
    map.addOverlay(new GMarker(home));


  }
  
  function getCurrentLocation() {

    jQuery('#location').html('<span style="color: red;"> detecting ... </span>');

    geo.getCurrentPosition(function(p) {
      
      window.lat = p.latitude;
      window.lng = p.longitude;
      window.accuracy = p.accuracy;
      window.streetNumber = p.gearsAddress.streetNumber || '';
      window.street = p.gearsAddress.street || '';
      window.city = p.gearsAddress.city || '';
      window.region = p.gearsAddress.region || '';
      window.postalCode = p.gearsAddress.postalCode || '';
      window.country = p.gearsAddress.country || '';  
      
      var locationLabel = [];
      locationLabel.push(window.streetNumber);
      locationLabel.push(window.street);
      locationLabel.push(window.city);
      locationLabel.push(window.region);
      locationLabel.push(window.postalCode);
      locationLabel.push('[ lat=' + window.lat + ' lng=' + window.lng + ' accuracy=+/- ' + window.accuracy +  ' meter(s)]');
      locationLabel = locationLabel.join(' ');

      jQuery('#location').html(locationLabel);

      initMap();

    }, handleError, {enableHighAccuracy: true, gearsRequestAddress: true});
  }

  function updateMarkersBound() {

    var bound = new GLatLngBounds();

    for (var id in window.markers) {
      if (window.markers.hasOwnProperty(id)) {
      var marker = window.markers[id];
      var point = marker.latlng;
      bound.extend(point); 
      } 
    }

    var boundCenter = bound.getCenter();
    var boundZoom = window.map.getBoundsZoomLevel(bound);
    window.map.setCenter(boundCenter, boundZoom);
  }

  function emptyMarkers() {
      
    window.map.disableInfoWindow();

    for (var id in window.markers) {
      if (window.markers.hasOwnProperty(id)) {
        var marker = window.markers[id];
        window.map.removeOverlay(marker);
        delete marker;     
      }       
    }

    window.map.enableInfoWindow();

    window.markers = {};
  }

  function createVideoMarker(lat, lng, videoEntry) {
    var point = new GLatLng(lat, lng);
    var videoThumb = videoEntry.media$group.media$thumbnail[0].url;

    var marker = new MarkerLight(point, {image: videoThumb});

    GEvent.addListener(marker, "click", function() {
      openVideoInfo(videoEntry);
    });

    return marker;
  }

  function openVideoInfo(videoEntry) {

    var videoId = videoEntry.media$group.yt$videoid.$t;
    var videoTitle = videoEntry.media$group.media$title.$t;
    var videoDesc = videoEntry.media$group.media$description.$t;
    var videoThumb = videoEntry.media$group.media$thumbnail[0].url;

    var marker = window.markers[videoId];

    var html = [];
    html.push('<div class="mapInfoBox">');
    html.push(videoTitle);
    html.push('<br>');
    html.push(getYouTubePlayerHtml(videoId));
    html.push('</div>');
    html = html.join('<br/>');      

    window.map.openInfoWindowHtml(marker.latlng, html);
  }

  function youtubeCallback(feed) {    

    var data = eval(feed);
    console.log(data);

    var html = [];        

    emptyMarkers();
    jQuery('#videos').empty();

    if (typeof data.feed.entry == 'undefined') {
      data.feed.entry = [];
      jQuery('#status').html('No matches.');
    } else {      
      for (var i = 0; i < data.feed.entry.length; i++) {
        
        var videoEntry = data.feed.entry[i];
        var videoId = videoEntry.media$group.yt$videoid.$t;
        var videoTitle = videoEntry.media$group.media$title.$t;
        var videoDesc = videoEntry.media$group.media$description.$t;
        var videoThumb = videoEntry.media$group.media$thumbnail[0].url;
        var georss = videoEntry.georss$where.gml$Point.gml$pos.$t      
        var lat = georss.split(' ')[0];
        var lng = georss.split(' ')[1];

        var videoMarker = createVideoMarker(lat, lng, videoEntry);

        window.map.addOverlay(videoMarker);            
        
        window.markers[videoId] = videoMarker;

        var div = jQuery('<div></div>');

        div.append(videoTitle);
        div.append('<br/>');   

        div.append(createThumbnailDiv(videoEntry));
        div.append('<br/>');
        
        jQuery('#videos').append(div);
      }

      updateMarkersBound();

      hideLoading();
    }
  };
  
  function createThumbnailDiv(videoEntry) {
    var videoId = videoEntry.media$group.yt$videoid.$t;
    var videoTitle = videoEntry.media$group.media$title.$t;
    var videoDesc = videoEntry.media$group.media$description.$t;
    var videoThumb = videoEntry.media$group.media$thumbnail[0].url;
    var georss = videoEntry.georss$where.gml$Point.gml$pos.$t      
    var lat = georss.split(' ')[0];
    var lng = georss.split(' ')[1];

    var thumbnail = jQuery('<img class="thumbnail" src="' + videoThumb + '" />');

    var html = [];
    html.push('<b>' + videoTitle + '</b>');
    html.push('<br>');
    html.push('lat=' + lat);
    html.push('<br>');
    html.push('lng=' + lng);
    html.push('<br>');
    html.push('<br>');
    html.push('<div style="font-size: 12px; color: gray;">' + videoDesc + '</div>');
    html = html.join('');

    var mouseOverDiv = null;
    
    var mouseOverHandler = function(e) {   
      
      openVideoInfo(videoEntry);

      var style = 'font-size: 11px; font-family: arial; position: absolute; top: ' + e.pageY + 'px; left: ' + e.pageX 
          + 'px; padding: 5px; width: 200px; border: solid black 1px; background: white;';
      mouseOverDiv = jQuery('<div style="' + style + '">' + html + '</div>'); 
      
      jQuery(document.body).append(mouseOverDiv);

      thumbnail.unbind('mouseover');

      thumbnail.mouseout(function() {  
        thumbnail.unbind('mouseout');
        mouseOverDiv.remove();
        thumbnail.mouseover(mouseOverHandler);
      });   
    }

    thumbnail.mouseover(mouseOverHandler);   

    return thumbnail;
  }

  function geoSearchYouTube(callback, keywords, lat, lng) {
    
    var radius = jQuery('#radius').val();
    var max = jQuery('#max').val();    

    var youtubeFeed =
      ['http://gdata.youtube.com/feeds/api/videos?callback=',
      callback, '&alt=json-in-script&q=',
      keywords.join('+'), '&location=', lat, ',', lng, '!&location-radius=', 
      radius ,'mi', '&v=2&start-index=1&max-results=', max].join('');

    var script = document.createElement('script');
    script.src = youtubeFeed;

    document.body.appendChild(script);

    jQuery('#input').val('');
  }

  function getYouTubePlayerHtml(id) {
    var html = [];

    html.push('<object width="250" height="200">');
    html.push('<param name="movie" value="');
    html.push('http://www.youtube.com/v/' + id);
    html.push('"></param>');
    html.push('<param name="wmode" value="transparent"></param>');
    html.push('<embed src="');
    html.push('http://www.youtube.com/v/' + id);
    html.push('" type="application/x-shockwave-flash"');
    html.push(' wmode="transparent" width="250" height="200">');
    html.push('</embed></object>');

    return html.join('');
  }

  function showLoading() {
    jQuery('#status').html('loading...');
  }

  function hideLoading() {
    jQuery('#status').html('');
  }
  
  function handleError(positionError) {
    alert('Attempt to get location failed: ' + positionError.message);
  }