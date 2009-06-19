/*
*  How to setup two keyboards for different textareas.
*/

google.load("elements", "1", {packages: "keyboard"});

function onLoad() {
  var content = document.getElementById('content');
  // Create the HTML for out text area
  content.innerHTML = '<div>Type Hindi in one textarea and type Arabic in the ' +
                      'other.</div>' +
                      '<textarea id="t1" cols="40" rows="5"></textarea> ' +
                      '<textarea id="t2" cols="40" rows="5" ' +
                      'style="direction: rtl;"></textarea> ';

  var kbd1 = new google.elements.keyboard.Keyboard(
      [google.elements.keyboard.LayoutCode.HINDI],
      ['t1']);
  var kbd2 = new google.elements.keyboard.Keyboard(
      [google.elements.keyboard.LayoutCode.ARABIC],
      ['t2']);
}

google.setOnLoadCallback(onLoad);
