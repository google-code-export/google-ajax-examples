var myPano;

function loadMap() {
  var fenwayPark = new GLatLng(42.345573,-71.098326);
  panoramaOptions = { latlng:fenwayPark };
  myPano = new GStreetviewPanorama(document.getElementById("content"), panoramaOptions);
  GEvent.addListener(myPano, "error", handleNoFlash);
}

function handleNoFlash(errorCode) {
  if (errorCode == FLASH_UNAVAILABLE) {
    alert("Error: Flash doesn't appear to be supported by your browser");
    return;
  }
}