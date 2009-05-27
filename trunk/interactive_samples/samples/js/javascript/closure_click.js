/*
 * One great use is for event handlers
 * If a handler prints a value, it prints the value at trigger time
 * If you want to hardcode a value into handler, use closure
*/

var content = document.getElementById('content');

// BAD SETTING HANDLER
for (var i=0; i < 5; i++) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'Closure-less Button number ' + i;
  button.onclick = function() {
    alert("Closure-less Button number " + i);
  };
  content.appendChild(button);
}
content.appendChild(document.createElement('br'));


// GOOD SETTING HANDLER
function buttonClick(buttonNumber) {
  // buttonNumber is now snapshotted in this function that is returned!
  return function() {
    alert('Closure Button number ' + buttonNumber);
  };
}
for (var i=0; i < 5; i++) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'Closure Button number ' + i;
  button.onclick = buttonClick(i);
  content.appendChild(button);
}