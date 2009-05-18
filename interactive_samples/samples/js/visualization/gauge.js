function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Label');
  data.addColumn('number', 'Value');
  data.addRows(3);
  data.setValue(0, 0, 'Memory');
  data.setValue(0, 1, 80);
  data.setValue(1, 0, 'CPU');
  data.setValue(1, 1, 55);
  data.setValue(2, 0, 'Network');
  data.setValue(2, 1, 68);

  // Create and draw the visualization.
  new google.visualization.Gauge(document.getElementById('visualization')).
      draw(data, null);
}
