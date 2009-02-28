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
  map.addControl(new google.maps.SmallMapControl());
  map.addMapType(G_PHYSICAL_MAP);
  map.removeMapType(G_HYBRID_MAP);
  map.removeMapType(G_SATELLITE_MAP);
  map.setMapType(G_PHYSICAL_MAP);
  map.addControl(new google.maps.MapTypeControl());

  var options = new Object();
  options.listingTypes = "blended";

  // Set up custom pins
  //  options.pins["local"] = "red" | "blue" | "blue_std" | "red_std" | "blue_mid" | "red_mid"
  //  options.pins["kml"] = ""
  //  - or - as shown below, pass an array of map pins/markers
  options.pins = {};
  makePins(blackPin);
  makePins(greenPin);
  options.pins["local"] = blackPin.pins_;
  options.pins["kml"] = greenPin.pins_;

  // Set up custom labels
  //  options.labels["local"] = "red" | "blue" | "blue_round" | "blue_square" | "red_round" | "red_square" | "green_round"
  //  options.labels["kml"] = ""
  //  - or - as shown below, pass an array of map images, AND set your own CSS
  // e.g: td.gels-list-item-key { width : 14px; }, div.gels-list-item-key { width : 14px; height : 14px; }
  options.labels = {};
  options.labels["local"] = makeLabels("http://www.google.com/uds/solutions/localsearch/img/label_metalred_", ".png");
  options.labels["kml"] = makeLabels("http://www.google.com/uds/solutions/localsearch/img/label_metalblue_", ".png");

  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);

}

function makeLabels(baseUrl, extension){
  var labels = new Array();
  for (var i=0; i<8; i++) {
    label = baseUrl + String.fromCharCode(65+i) + extension;
    labels.push(label);
  }
  return labels;
}

function makePins(pinSet){
  // create the base icon for this pinset
  var baseIcon = new GIcon();
  baseIcon.image = pinSet.urlPrefix + "A" + pinSet.urlSuffix;
  baseIcon.shadow = pinSet.shadowUrl;
  baseIcon.iconSize = new GSize(pinSet.iconSize.x, pinSet.iconSize.y);
  baseIcon.shadowSize = new GSize(pinSet.shadowSize.x, pinSet.shadowSize.y);
  baseIcon.iconAnchor = new GPoint(pinSet.iconAnchor.x, pinSet.iconAnchor.y);
  baseIcon.infoWindowAnchor = new GPoint(pinSet.infoWindowAnchor.x,
                                         pinSet.infoWindowAnchor.y);
  pinSet.pins_ = new Array();
  for (var i = 0; i < 8; i++) {
    // clone the base icon and then swap its image URL
    var icon = new GIcon(baseIcon);
    icon.image = pinSet.urlPrefix + String.fromCharCode(65 + i) +
      pinSet.urlSuffix;
    pinSet.pins_.push(icon);
  }
}

var blackPin = {
  iconSize : { x:20, y:34 },
  shadowSize : { x:34, y:37 },
  iconAnchor : { x:9, y:34 },
  infoWindowAnchor : { x:9, y:2 },
  shadowUrl : "http://www.google.com/mapfiles/shadow50.png",
  urlPrefix : "http://www.google.com/mapfiles/marker_black",
  urlSuffix : ".png"
};

var greenPin = {
  iconSize : { x:20, y:34 },
  shadowSize : { x:34, y:37 },
  iconAnchor : { x:9, y:34 },
  infoWindowAnchor : { x:9, y:2 },
  shadowUrl : "http://www.google.com/mapfiles/shadow50.png",
  urlPrefix : "http://www.google.com/mapfiles/marker_green",
  urlSuffix : ".png"
};

google.setOnLoadCallback(OnLoad);