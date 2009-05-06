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
      var str = data.getFormattedValue(item.row, item.column);
      message += '{row:' + item.row + ',column:' + item.column + '} = ' + str + '\n';
    } else if (item.row != null) {
      var str = data.getFormattedValue(item.row, 0);
      message += '{row:' + item.row + ', (no column, showing first)} = ' + str + '\n';
    } else if (item.column != null) {
      var str = data.getFormattedValue(0, item.column);
      message += '{(no row, showing first), column:' + item.column + '} = ' + str + '\n';
    }
  }
  if (message == '') {
    message = 'nothing';
  }
  alert('You selected ' + message);
}

