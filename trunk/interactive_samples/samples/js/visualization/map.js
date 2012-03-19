function drawVisualization() {
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable([
    ['Lat', 'Lon', 'Name'],
    [37.4232, -122.0853, 'Work'],
    [37.4289, -122.1697, 'University'],
    [37.6153, -122.3900, 'Airport'],
    [37.4422, -122.1731, 'Shopping']
  ]);

  // Create and draw the visualization.
  new google.visualization.Map(document.getElementById('visualization')).
      draw(data, null);
}
