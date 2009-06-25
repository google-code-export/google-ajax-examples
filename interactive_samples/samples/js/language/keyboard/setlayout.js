/*
*  How to switch the keyboard layout to type in other language.
*/

google.load("elements", "1", {packages: "keyboard"});

var kbd;

function onLoad() {
  var content = document.getElementById('content');
  // Create the HTML for out text area
  content.innerHTML = '<div><i>(Scroll down)</i> ' +
                      'You can click the buttons below to choose a ' +
                      'keyboard layout.</div>' +
                      '<input onclick="kbd.setLayout(\'ru\')" type="button" ' +
                      'value="Russian" /> ' +
                      '<input onclick="kbd.setLayout(\'hi\')" type="button" ' +
                      'value="Hindi" /> ' +
                      '<input onclick="kbd.setLayout(\'th\')" type="button" ' +
                      'value="Thai" /> ' +
                      '<input onclick="kbd.setLayout(\'ar\')" type="button" ' +
                      'value="Arabic" /> ' +
                      '<input onclick="kbd.setLayout(\'pl\')" type="button" ' +
                      'value="Polish" /> ' +
                      '<input onclick="kbd.setLayout(\'fa\')" type="button" ' +
                      'value="Persian" /><br/> ' +
                      '<textarea id="t1" cols="100" rows="5"></textarea>';

  kbd = new google.elements.keyboard.Keyboard(
      [google.elements.keyboard.LayoutCode.RUSSIAN],
      ['t1']);
}

google.setOnLoadCallback(onLoad);
