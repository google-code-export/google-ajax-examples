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
  var options = new Object();
  options.listingTypes = "blended";
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);