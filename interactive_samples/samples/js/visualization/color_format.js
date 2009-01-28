function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Department');
  data.addColumn('number', 'Revenues');
  data.addRows(6);
  data.setCell(0, 0, 'Shoes');
  data.setCell(0, 1, 10700);
  data.setCell(1, 0, 'Sports');
  data.setCell(1, 1, -15400);
  data.setCell(2, 0, 'Toys');
  data.setCell(2, 1, 12500);
  data.setCell(3, 0, 'Electronics');
  data.setCell(3, 1, -2100);
  data.setCell(4, 0, 'Food');
  data.setCell(4, 1, 22600);
  data.setCell(5, 0, 'Art');
  data.setCell(5, 1, 1100);

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));
	  
  var formatter = new google.visualization.TableColorFormat();
  formatter.addRange(-20000, 0, 'white', 'orange');
  formatter.addRange(20000, null, 'red', '#33ff33');
  formatter.format(data, 1); // Apply formatter to second column
	  
  table.draw(data, {allowHtml: true, showRowNumber: true});
}
