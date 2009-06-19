/*
*  How to setup a textarea that allows typing with a Russian Virtual Keyboard.
*/

google.load("elements", "1", {packages: "keyboard"});

function onLoad() {
  var content = document.getElementById('content');
  // Create the HTML for out text area
  content.innerHTML = '<div>You can click the buttons on the onscreen ' +
                      'keybaord to type Russian. You can also type Russian '+
                      'with your keyboard. When you need to type English, ' +
                      'please click the [-] button to minimize the keyboard.' +
                      '</div><textarea id="t1" cols="100" rows="5"></textarea>';

  var kbd = new google.elements.keyboard.Keyboard(
      [google.elements.keyboard.LayoutCode.RUSSIAN],
      ['t1']);
}

google.setOnLoadCallback(onLoad);
