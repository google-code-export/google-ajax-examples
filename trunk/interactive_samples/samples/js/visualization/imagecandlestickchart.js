function drawVisualization() {
  // Populate the data table.
  dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string');
  dataTable.addColumn('number');
  dataTable.addColumn('number');
  dataTable.addColumn('number');
  dataTable.addColumn('number');
  dataTable.addRows(6);

  dataTable.setValue(0, 0, 'GOOG');
  dataTable.setValue(1, 0, 'MSFT');
  dataTable.setValue(2, 0, 'ORCL');
  dataTable.setValue(3, 0, 'AAPL');
  dataTable.setValue(4, 0, 'IBM');
  dataTable.setValue(5, 0, 'INTC');

  dataTable.setValue(0, 1, 90);
  dataTable.setValue(1, 1, 70);
  dataTable.setValue(2, 1, 50);
  dataTable.setValue(3, 1, 20);
  dataTable.setValue(4, 1, 15);
  dataTable.setValue(5, 1, 10);

  dataTable.setValue(0, 2, 100);
  dataTable.setValue(1, 2, 80);
  dataTable.setValue(2, 2, 60);
  dataTable.setValue(3, 2, 30);
  dataTable.setValue(4, 2, 45);
  dataTable.setValue(5, 2, 20);

  dataTable.setValue(0, 3, 110);
  dataTable.setValue(1, 3, 90);
  dataTable.setValue(2, 3, 70);
  dataTable.setValue(3, 3, 40);
  dataTable.setValue(4, 3, 35);
  dataTable.setValue(5, 3, 30);

  dataTable.setValue(0, 4, 120);
  dataTable.setValue(1, 4, 100);
  dataTable.setValue(2, 4, 80);
  dataTable.setValue(3, 4, 50);
  dataTable.setValue(4, 4, 55);
  dataTable.setValue(5, 4, 40);

  // Draw the chart.
  var chart = new google.visualization.ImageCandlestickChart(document.getElementById('visualization'));
  chart.draw(dataTable, {width: 400});
}
