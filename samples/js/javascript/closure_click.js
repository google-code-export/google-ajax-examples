/*
 * One great way to use closure is for event handlers.  An event handler can be
 * triggered asynchronously anytime after you define it.  What if you want to
 * create 5 buttons that will alert what button number they are when clicked?
 * Each click event handler calls a function, and that function needs to be aware
 * of what button number it is _before_ it is called.
 *
 * In this sample, we will see what happens when we set click handlers without
 * closure, and then see how we can benefit by setting them with closure.
*/

var content = document.getElementById('content');

// Here is a for loop that sets 5 buttons' click handlers _without_ closure.
// When these buttons are clicked, they will output the value of i
// at the time of the click!
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

// Our closure!
function buttonClick(buttonNumber) {
  // buttonNumber is now snapshotted in this function that is returned!
  return function() {
    alert('Closure Button number ' + buttonNumber);
  };
}

/// Here is a for loop that sets 5 buttons' click handlers _with_ closure.
// When these buttons are clicked, they will output the value of i
// at the time that the click handler was set.
for (var i=0; i < 5; i++) {
  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'Closure Button number ' + i;
  button.onclick = buttonClick(i);
  content.appendChild(button);
}