function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Lat');
  data.addColumn('number', 'Lon');
  data.addColumn('string', 'Name');
  data.addRows(4);
  data.setCell(0, 0, 37.4232);
  data.setCell(0, 1, -122.0853);
  data.setCell(0, 2, 'Work');
  data.setCell(1, 0, 37.4289);
  data.setCell(1, 1, -122.1697);
  data.setCell(1, 2, 'University');
  data.setCell(2, 0, 37.6153);
  data.setCell(2, 1, -122.3900);
  data.setCell(2, 2, 'Airport');
  data.setCell(3, 0, 37.4422);
  data.setCell(3, 1, -122.1731);
  data.setCell(3, 2, 'Shopping');

  // Create and draw the visualization.
  new google.visualization.Map(document.getElementById('visualization')).
      draw(data, null);
}
