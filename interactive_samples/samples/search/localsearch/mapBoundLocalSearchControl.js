/*
*  How to build a Google Map and bind a SearchControl to it
*/

// First, we have to load the APIs.
google.load('maps' , '2');
google.load('search' , '1');

// Second, we set up our function, OnLoad
function OnLoad() {
  // Get the content div and clear it's current contents.
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  // Next thing we have to do is build two divs to hold our stuff
  var mapContainer = document.createElement('div'); // build the map div
  mapContainer.style.height = '350px'; // set the map height
  mapContainer.style.width = '350px'; // set the map width
  var controlContainer = document.createElement('div'); // build the control div
  controlContainer.style.width = '350px'; // set the control width

  // Now we have to add these divs to the content div in the document body
  contentDiv.appendChild(mapContainer);
  contentDiv.appendChild(controlContainer);

  // We're ready to build our map...
  var map = new google.maps.Map2(mapContainer);

  // ...and add a couple of controls.
  map.addControl(new google.maps.SmallMapControl()); // Add a small map control
  map.addControl(new google.maps.MapTypeControl()); // Add the map type control

  // We'll wait to the end to actually initialize the map
  // So let's build the search control
  var searchControl = new google.search.SearchControl();

  // Initialize a LocalSearch instance
  var searcher = new google.search.LocalSearch(); // create the object
  searcher.setCenterPoint = map; // bind the searcher to the map

  // Create a SearcherOptions object to ensure we can see all results
  var options = new google.search.SearcherOptions(); // create the object
  options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);

  // Add the searcher to the SearchControl
  searchControl.addSearcher(searcher , options);

  // Draw the control
  searchControl.draw(controlContainer);

  // Set the map's center point and finish!
  map.setCenter(new google.maps.LatLng(37.443915 , -122.163610), 11);

 // Execute an initial search
  searchControl.execute('google');
}

google.setOnLoadCallback(OnLoad);