function drawVisualization() {
  var wrapper = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    dataTable: [['', 'Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
                ['', 700, 300, 400, 500, 600, 800]],
    options: {'title': 'Countries'},
    containerId: 'visualization'
  });
  wrapper.draw();
}

