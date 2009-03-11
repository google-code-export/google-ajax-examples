/*
 * This sample shows how to use the linkTarget option to specify where
 * clicked links will open
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
    linkTarget: '_blank'
  };
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);​​​