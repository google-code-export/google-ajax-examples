// To create your own visualization,
// you need to implement a constructor
// and a draw method.

// Namespace, implemented as a global variable.
var myvisualization = {};

// MyTable class constructor.
// Parameters:
//   container: the HTML element where the visualization
//              will be rendered in.
myvisualization.MyTable = function(container) {
  // Stores the container HTML element.
  this.containerElement = container;
}

// MyTable.draw() method.
// Parameters:
//   data: The google.visualization.DataTable to display.
//   options: name/value map of options. 
//            You should document the specific options
//            your visualization supports.
//            This visualization support only "showLineNumber" boolean option.
myvisualization.MyTable.prototype.draw = function(data, options) {
  // showLineNumber boolean option.
  var showLineNumber = options && options.showLineNumber;
  
  var html = [];
  html.push('<table border="1">');
  
  // Header row.
  html.push('<tr>');
  if (showLineNumber) {
	html.push('<th>Line Number</th>');
  }

  // Other rows.
  for (var col = 0; col < data.getNumberOfColumns(); col++) {
    html.push('<th>' + this.escapeHtml(data.getColumnLabel(col)) + '</th>');
  }
  
  html.push('</tr>');

  for (var row = 0; row < data.getNumberOfRows(); row++) {
    html.push('<tr>');
    if (showLineNumber) {
      html.push('<td align="right">', (row + 1), '</td>');
    }

    for (var col = 0; col < data.getNumberOfColumns(); col++) {
      html.push(data.getColumnType(col) == 'number' ? '<td align="right">' : '<td>');
	  html.push(this.escapeHtml(data.getFormattedValue(row, col)));
	  html.push('</td>');
	}
	html.push('</tr>');
  }
  html.push('</table>');

  this.containerElement.innerHTML = html.join('');
}

// Helper function.
myvisualization.MyTable.prototype.escapeHtml = function(text) {
  if (text == null) {
    return '';
  }
  return text.replace(/&/g, '&').
         replace(/</g, '<').
         replace(/>/g, '>').
         replace(/"/g, '"');
}

// This is a simple usage of the visualization.
var drawVisualizations = function() {
  // Create and populate a data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Force');
  data.addColumn('number', 'Level');
  data.addRows([['Fire', 1], ['Water', 5]]);
  
  // Instantiate our table object without line numbers.
  var vis_without_line_numbers = new myvisualization.MyTable(document.getElementById('visualization_without_line_numbers'));
  
  // Draw our table with the data we created locally.
  vis_without_line_numbers.draw(data, {showLineNumber: false});

  // Instantiate our table object with line numbers.
  var vis_with_line_numbers = new myvisualization.MyTable(document.getElementById('visualization_with_line_numbers'));
  
  // Draw our table with the data we created locally.
  vis_with_line_numbers.draw(data, {showLineNumber: true});
}
