/*
 * This sample shows how to use all of the callbacks in the Local Search Control.
 * Read the comments inline in the code to see what each callback does.
*/

google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function searchComplete(a, response) {
  // Triggers after a user does a search
  alert('onSearchCompleteCallback: result #1: '+ response.responseData.results[0].titleNoFormatting);
}

function generateMarkerHTML(a, originalInfoWindow, result) {
  // Triggers when a map marker is clicked
  // Must return the DOM node to be displayed in the search result
  var div = document.createElement('div');
  div.innerHTML = 'My Custom Result:<br>' + result.titleNoFormatting;
  return div;
}

function OnLoad() {
  var content = document.getElementById("content");
  content.style.border = "1px solid #979797";
  content.style.height = "350px";

  var map = new google.maps.Map2(content);
  map.setMapType(G_PHYSICAL_MAP);
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
  var options = {
    // click on "clear results" to trigger
    onIdleCallback: function() { alert("onIdleCallback"); },
    
    // do a search to trigger
    onSearchCompleteCallback: searchComplete,
    
    // click on a map marker to trigger
    onGenerateMarkerHtmlCallback: generateMarkerHTML,
    
    // onGenerateMarkerHtmlStringCallback does the same thing as onGenerateMarkerHtmlCallback
    // except it expects an HTML string instead of a DOM node to be returned.
    
    onMarkersSetCallback: function() {alert('onMarkersSetCallback: add some application specific markers when all of the result markers are being placed');}
  };
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);
