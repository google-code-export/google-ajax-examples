function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', '', 'Country');
  data.addColumn('number', 'Population (mil)', 'a');
  data.addColumn('number', 'Area (km2)', 'b');
  data.addRows(5);
  data.setValue(0, 0, 'CN');
  data.setValue(0, 1, 1324);
  data.setValue(0, 2, 9640821);
  data.setValue(1, 0, 'IN');
  data.setValue(1, 1, 1133);
  data.setValue(1, 2, 3287263);
  data.setValue(2, 0, 'US');
  data.setValue(2, 1, 304);
  data.setValue(2, 2, 9629091);
  data.setValue(3, 0, 'ID');
  data.setValue(3, 1, 232);
  data.setValue(3, 2, 1904569);
  data.setValue(4, 0, 'BR');
  data.setValue(4, 1, 187);
  data.setValue(4, 2, 8514877);

  // Create and draw the visualization.
  new google.visualization.IntensityMap(document.getElementById('visualization')).
      draw(data, null);
}
