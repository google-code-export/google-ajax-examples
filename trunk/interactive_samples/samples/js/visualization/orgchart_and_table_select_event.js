function drawOrgChartAndTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Manager');
  data.addRows(5);
  data.setCell(0, 0, 'Mike');
  data.setCell(1, 0, 'Jim');
  data.setCell(1, 1, 'Mike');
  data.setCell(2, 0, 'Alice');
  data.setCell(2, 1, 'Mike');
  data.setCell(3, 0, 'Bob');
  data.setCell(3, 1, 'Jim');
  data.setCell(4, 0, 'Carol');
  data.setCell(4, 1, 'Bob');

  var orgchart = new google.visualization.OrgChart(document.getElementById('orgchart'));
  orgchart.draw(data, null);

  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(data, null);

  // When the table is selected, update the orgchart.
  google.visualization.events.addListener(table, 'select', function() {
    orgchart.setSelection(table.getSelection());
  });

  // When the orgchart is selected, update the table visualization.
  google.visualization.events.addListener(orgchart, 'select', function() {
    table.setSelection(orgchart.getSelection());
  });
}
