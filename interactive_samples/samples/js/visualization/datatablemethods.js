var drawVisualizations = function() {
  // Create and populate a data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Force');
  data.addColumn('number', 'Level');
  
  // Add 2 rows.
  // google.visualization.DataTable.addRows() can take a 2-dim array of values.
  data.addRows([['Fire', 1], ['Water', 5]]);
  
  // Add one more row.
  data.addRow(['sand', 4]);
  
  // Draw a table with this data table.
  var originalVisualization = new google.visualization.Table(document.getElementById('original_data_table'));
  originalVisualization.draw(data);
  
  // Clone the data table and modify it a little.
  var modifiedData = data.clone();
  
  // Modify existing cell.
  modifiedData.setCell(1, 1, 666);
  
  // Sort the data by the 2nd column (counting from 0). 
  modifiedData.sort(1);
  
  // Insert rows in the middle of the data table.
  modifiedData.insertRows(2, [['new fire', 14], ['new water', 41]]); 
  
  // Draw a table with this data table.
  var modifiedVisualization = new google.visualization.Table(document.getElementById('modified_data_table'));
  modifiedVisualization.draw(modifiedData);
}
