/* 
 * Normally, when a search completes, the map is re-positioned
 * and zoomed in so that it shows all of the results. 
 * Applications can disable this move/zoom operation by setting
 * the suppressZoomToBounds option to false. The default value is true.
*/

google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function OnLoad() {
  var content = document.getElementById("content");
  content.style.border = "1px solid #979797";
  content.style.height = "350px";

  var map = new google.maps.Map2(content);
  map.setMapType(G_PHYSICAL_MAP);
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 8);
  
  var options = {
    suppressZoomToBounds: true
  }
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);​​
