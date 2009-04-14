/*
*  How to make a slideshow with a photo feed using our custom control.
*  To see the options, go here or click the docs link in the titlebar:
*  http://www.google.com/uds/solutions/slideshow/index.html
*/

google.load("feeds", "1");

function OnLoad() {
  var feed  = "http://dlc0421.googlepages.com/gfss.rss";
  var options = {
    displayTime:2000,
    transistionTime:600,
    scaleImages:true,
    fullControlPanel : true
  };
  var ss = new GFslideShow(feed, "picasaSlideshow", options);
}

google.setOnLoadCallback(OnLoad);