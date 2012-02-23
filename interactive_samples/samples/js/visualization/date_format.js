function drawVisualization() {
  // Create and populate the data table.
  var date1 = new Date("8/6/1975");
  var date2 = new Date("9/25/2006");
  var date3 = new Date("4/16/2008");
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Short');
  data.addColumn('date', 'Medium');
  data.addColumn('date', 'Long');
  data.addRow([date1, date1, date1]);
  data.addRow([date2, date2, date2]);
  data.addRow([date3, date3, date3]);

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));

  var formatter = new google.visualization.DateFormat({formatType:'short'});
  formatter.format(data, 0);

  var formatter = new google.visualization.DateFormat({formatType:'medium'});
  formatter.format(data, 1);

  var formatter = new google.visualization.DateFormat({formatType:'long'});
  formatter.format(data, 2);

  table.draw(data, {allowHtml: true, showRowNumber: true});
}
