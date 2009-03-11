/*
 * This demo shows how to set a zoom limit. This specifies the
 * maximum zoom level of a map that is re-positioned and zoomed
 * to show all of the results. Valid values are 0-16.
*/

google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function OnLoad() {
  var content = document.getElementById("content");
  content.style.border = "1px solid #979797";
  content.style.width = "700px";
  content.style.height = "350px";

  var map = new google.maps.Map2(content);
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
  var options = {
    zoomLimit: 3
  };
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);