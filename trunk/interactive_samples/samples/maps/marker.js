function loadMap() {
  map = new GMap2(document.getElementById("content"));
  var where = new GLatLng(35.039545, 135.72842);
  map.setCenter(where, 17);
  var opts = {
    title: "Golden Pavilion Temple, Kyoto"
  };
  var marker = new GMarker(where, opts);
  map.addOverlay(marker);
}
