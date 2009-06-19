/*
*  How to show and hide the Virtual Keyboard in your javascript code.
*/

google.load("elements", "1", {packages: "keyboard"});

var kbd;

function onLoad() {
  var content = document.getElementById('content');
  // Create the HTML for out text area
  content.innerHTML = '<div>You can click the Show/Hide button enable/disable' +
                      ' the Virtual Keyboard.</div>' +
                      '<input type="button" onclick="toggleVisible()" ' +
                      'id="btVisible" value="Hide"></input><br/>' +
                      '<textarea id="t1" cols="100" rows="5"></textarea>';

  kbd = new google.elements.keyboard.Keyboard(
      [google.elements.keyboard.LayoutCode.THAI],
      ['t1']);
}

// If the keyboard is visible, hide it.
// If the keyboard is invisible, show it.
function toggleVisible() {
  var button = document.getElementById('btVisible');
  if (kbd.isVisible()) {
    kbd.setVisible(false);
    document.getElementById('btVisible').value = 'Show';
  } else {
    kbd.setVisible(true);
    document.getElementById('btVisible').value = 'Hide';
  }
}

google.setOnLoadCallback(onLoad);
