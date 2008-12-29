/*
*  Load Prototype and script.aculo.us, then slide a div up and down.
*/

google.load("prototype", "1");
google.load("scriptaculous", "1");

var up = false;
function slideUpDown() {
  if (up) {
    Effect.SlideDown('content', {'duration' : 0.2});
    up = false;
  } else {
    Effect.SlideUp('content', {'duration' : 0.2});
    up = true;
  }
}

function OnLoad(){
  var content = $('content');
  content.innerHTML = '<div>The Content</div>';
  window.setInterval('slideUpDown();', 600);
}

google.setOnLoadCallback(OnLoad);