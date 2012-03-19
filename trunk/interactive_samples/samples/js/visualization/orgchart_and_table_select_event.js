function drawOrgChartAndTable() {
  var data = google.visualization.arrayToDataTable([
    ['Name',  'Manager'],
    ['Mike',  null],
    ['Jim',   'Mike'],
    ['Alice', 'Mike'],
    ['Bob',   'Jim'],
    ['Carol', 'Bob']
  ]);

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
