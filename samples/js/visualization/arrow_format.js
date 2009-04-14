function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Department');
  data.addColumn('number', 'Revenues Change');
  data.addRows(5);
  data.setCell(0, 1, 12, '12.0%');
  data.setCell(1, 0, 'Sports');
  data.setCell(1, 1, -7.3, '-7.3%');
  data.setCell(2, 0, 'Toys');
  data.setCell(2, 1, 0, '0%');
  data.setCell(3, 0, 'Electronics');
  data.setCell(3, 1, -2.1, '-2.1%');
  data.setCell(4, 0, 'Food');
  data.setCell(4, 1, 22, '22.0%');

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));
  
  var formatter = new google.visualization.TableArrowFormat();
  formatter.format(data, 1); // Apply formatter to second column
  
  table.draw(data, {allowHtml: true, showRowNumber: true});
}
