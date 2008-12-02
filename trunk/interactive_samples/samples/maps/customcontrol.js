function MyPane() {}
MyPane.prototype = new GControl;
MyPane.prototype.initialize = function(map) {
  var me = this;
  me.panel = document.createElement("div");
  me.panel.style.width = "200px";
  me.panel.style.height = "300px";
  me.panel.style.border = "1px solid gray";
  me.panel.style.background = "white";
  map.getContainer().appendChild(me.panel);
  GEvent.addDomListener(me.panel, "click",
      function() {
        map.removeControl(me);
      });
  return me.panel;
};
MyPane.prototype.getDefaultPosition = function() {
  return new GControlPosition(
      G_ANCHOR_TOP_RIGHT, new GSize(10, 50));
};
MyPane.prototype.getPanel = function() {
  return me.panel;
}

function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  map.addControl(new MyPane());
}

