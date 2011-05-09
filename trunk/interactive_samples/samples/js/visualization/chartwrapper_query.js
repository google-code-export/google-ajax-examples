function drawVisualization() {
  // To see the data that this visualization uses, browse to
  // http://spreadsheets.google.com/ccc?key=pCQbetd-CptGXxxQIG7VFIQ
  var wrapper = new google.visualization.ChartWrapper({
    dataSourceUrl: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&range=B1:D11&pub=1',
    chartType: 'PieChart',
    containerId: 'visualization'
  });
  wrapper.draw();
}
 ​