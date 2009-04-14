/*
 * This sample shows how to specify the publisher ID to use with the advertisements
 * for revenue sharing.
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
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
  var options = {
    adsOptions: {
      client: 'googlepsotest-afsjs',
      adsafe: 'high', // safe ads
      language: 'en'
    }
  };
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);