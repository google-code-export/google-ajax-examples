function drawVisualization() {
  visualization = new google.visualization.Table(document.getElementById('table'));
  visualization.draw(data, null);
  
  // Add our selection handler.
  google.visualization.events.addListener(visualization, 'select', selectHandler);
}

// The selection handler.
// Loop through all items in the selection and concatenate
// a single message from all of them.
function selectHandler() {
  var selection = visualization.getSelection();
  var message = '';
  for (var i = 0; i < selection.length; i++) {
    var item = selection[i];
    if (item.row != null && item.column != null) {
      message += '{row:' + item.row + ',column:' + item.column + '}';
    } else if (item.row != null) {
      message += '{row:' + item.row + '}';
    } else if (item.column != null) {
      message += '{column:' + item.column + '}';
    }
  }
  if (message == '') {
    message = 'nothing';
  }
  alert('You selected ' + message);
}