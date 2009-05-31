function drawVisualization() {
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Name');
  dataTable.addColumn('number', 'Age');
  dataTable.addColumn('string', 'Instrument');
  dataTable.addColumn('string', 'Color');
  dataTable.addRows(4);
  dataTable.setCell(0, 0, 'John');
  dataTable.setCell(1, 0, 'Paul');
  dataTable.setCell(2, 0, 'George');
  dataTable.setCell(3, 0, 'Ringo');
  dataTable.setCell(0, 1, 24);
  dataTable.setCell(1, 1, 52);
  dataTable.setCell(2, 1, 16);
  dataTable.setCell(3, 1, 72);
  dataTable.setCell(0, 2, 'Guitar');
  dataTable.setCell(1, 2, 'Sitar');
  dataTable.setCell(2, 2, 'Guitar');
  dataTable.setCell(3, 2, 'Drums');
  dataTable.setCell(0, 3, 'Blue');
  dataTable.setCell(1, 3, 'Red');
  dataTable.setCell(2, 3, 'Green');
  dataTable.setCell(3, 3, 'White');

  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dataTable, null);

  var dataView = new google.visualization.DataView(dataTable);
  dataView.setColumns([0, 1]);

  var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  chart.draw(dataView, {width: 400, height: 200});
}

