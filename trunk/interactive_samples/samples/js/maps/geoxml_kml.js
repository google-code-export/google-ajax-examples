function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(36.5, -98.7), 4);

  var site = "http://bbs.keyhole.com";
  var file = "ubb/download.php?Number=50664";
  var geoXml = new GGeoXml(site + "/" + file);
  map.addOverlay(geoXml);
}

