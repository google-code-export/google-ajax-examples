function drawVisualization() {
  var dataTable = google.visualization.arrayToDataTable([
    ['Name',   'Age', 'Instrument', 'Color'],
    ['John',   24,     'Guitar',    'Blue'],
    ['Paul',   52,     'Sitar',     'Red'],
    ['George', 16,     'Guitar',    'Green'],
    ['Ringo',  72,     'Drums',     'White']
  ]);

  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dataTable, null);

  var dataView = new google.visualization.DataView(dataTable);
  dataView.setColumns([0, 1]);

  var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  chart.draw(dataView, {width: 400, height: 200});
}

