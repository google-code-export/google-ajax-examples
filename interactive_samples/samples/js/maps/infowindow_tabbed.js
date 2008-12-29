function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  var tabs = [
    new GInfoWindowTab("Tab #1", "Hello"),
    new GInfoWindowTab("Tab #2", "World")
  ];
  map.openInfoWindowTabsHtml(map.getCenter(), tabs);
}
