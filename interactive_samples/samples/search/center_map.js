google.load('search', '1');
google.load('maps', '2');

function OnLoad() {
  var content = document.getElementById('content');
  var mapDiv = document.createElement('div');
  var searchDiv = document.createElement('div');
  content.appendChild(mapDiv);
  content.appendChild(searchDiv);
  
  // set up for Gmap2/GLatLng Version
  var gmap = new google.maps.Map2(mapDiv);
  gmap.addControl(new google.maps.SmallMapControl());
  gmap.setCenter(new google.maps.LatLng(32.833442, -96.915893), 11);
  
  // create a search control
  var searchControl = new google.search.SearchControl();
  var localSearch = new google.search.LocalSearch();
  searchControl.addSearcher(localSearch);

  // tell the searcher to draw itself and tell it where to attach
  localSearch.setCenterPoint(gmap.getCenter());
  searchControl.draw(searchDiv);

  // execute an inital search
  searchControl.execute("Starbucks Coffee");

}

google.setOnLoadCallback(OnLoad, true);
