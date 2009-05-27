/*
 * Javascript uses functional scope
 * A variable defined in a function is not available outside
 * Very useful for keeping global namespace clean
 * Hide your code in an anonymous function!
 * Then 3rd party Javascripts don't collide!
 * To export any methods to the global, assign them to the window obj (that is the global context)
*/

var contentDiv = document.getElementById('content');
(function() {
  var a = 'Invisible outside of anonymous function';
  function invisibleOutside() {
  }

  function visibleOutside() {
  }
  window.visibleOutside = visibleOutside;

  var html = '--INSIDE Anonymous--';
  html += '<br/> typeof invisibleOutside: ' + typeof invisibleOutside;
  html += '<br/> typeof visibleOutside: ' + typeof visibleOutside;
  contentDiv.innerHTML = html + '<br/><br/>';
})();

var html = '--OUTSIDE Anonymous--';
html += '<br/> typeof invisibleOutside: ' + typeof invisibleOutside;
html += '<br/> typeof visibleOutside: ' + typeof visibleOutside;
contentDiv.innerHTML += html + '<br/>';