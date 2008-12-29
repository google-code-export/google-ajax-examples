/*
*  How to load MooTools and tween color.
*/

google.load("mootools", "1.2.1");

var content;
var isRed = false;

// This function is called every 1000 miliseconds and it just tweens the color
// of the text.
function tweenColor() {
  var myFx = new Fx.Tween(content);
  if (!isRed) {
    myFx.start('color', '#f00');
    isRed = true;
  } else {
    myFx.start('color', '#000');
    isRed = false;
  }

}

function OnLoad(){
  content = document.getElementById('content');
  content.innerHTML = '<h1>Tweening</h1>';
  // call tweenColor every 1000 miliseconds
  window.setInterval('tweenColor();', 1000);
}

google.setOnLoadCallback(OnLoad);