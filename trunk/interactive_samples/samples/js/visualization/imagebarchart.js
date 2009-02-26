function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Height');
  data.addColumn('boolean', 'Smokes');
  data.addRows(3);
  data.setCell(0, 0, 'Tong Ning mu');
  data.setCell(1, 0, 'Huang Ang fa');
  data.setCell(2, 0, 'Teng nu');
  data.setCell(0, 1, 174);
  data.setCell(1, 1, 523);
  data.setCell(2, 1, 86);
  data.setCell(0, 2, true);
  data.setCell(1, 2, false);
  data.setCell(2, 2, true);

  // Create and draw the visualization.
  new google.visualization.ImageBarChart(document.getElementById('visualization')).
      draw(data, null);  
}
