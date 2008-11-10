/*
*  How to load Dojo and fade text in and out.
*/

google.load("dojo", "1");

var hidden = false;
function fadeInOut() {
  var animArgs = {
    node: "content",
    duration: 500, // ms to run animation
    delay: 10 // ms to stall before playing
  };

  if (hidden) {
    dojo.fadeIn(animArgs).play();
    hidden = false;
  } else {
    dojo.fadeOut(animArgs).play();
    hidden = true;
  }
}

function OnLoad(){
  window.setInterval('fadeInOut()', 1000);
}

google.setOnLoadCallback(OnLoad);