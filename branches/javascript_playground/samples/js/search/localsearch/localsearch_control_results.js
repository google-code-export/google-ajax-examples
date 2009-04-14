/*
 * This demo shows some options for customizing the results.
 * It shows how to put results on multiple lines, specify
 * what type of results you want (KML & Local Business),
 * as well as how to specify the number of pages of results.
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
    // Put results inline (default), can also suppress them or put them in another DOM node
    resultList: 'inline',
    // Put each result on multiple lines instead of one
    resultFormat: 'multi-line1',
    // Allow local business results, as well as KML results
    listingTypes: 'blended',
    // Only allow for 2 pages of results. (can specify 1-4)
    maxCursorPages: 2
  };
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);
​