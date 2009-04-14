function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Height');
  data.addRows(3);
  data.setCell(0, 0, 'Tong Ning mu');
  data.setCell(1, 0, 'Huang Ang fa');
  data.setCell(2, 0, 'Teng nu');
  data.setCell(0, 1, 174);
  data.setCell(1, 1, 523);
  data.setCell(2, 1, 86);

  // Create and draw the visualization.
  new google.visualization.ScatterChart(document.getElementById('visualization')).
      draw(data, null);  
}
