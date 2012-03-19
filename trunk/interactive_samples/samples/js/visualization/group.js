function drawJoin() {
  var dt = google.visualization.arrayToDataTable([
    ['Department Number', 'First Name', 'Last Name', 'Sales'],
    [1,                      'john',      'doe',       10],
    [1,                      'jane',      'doe',       100],
    [3,                      'jill',     'jones',      50],
    [3,                      'jack',     'jones',      75],
    [5,                      'al',    'weisenheimer',  500]
  ]);

  // Group dt by column 0, and show column 3 aggregated by sum.
  var grouped_dt = google.visualization.data.group(
      dt, [0],
      [{'column': 3, 'aggregation': google.visualization.data.sum, 'type': 'number'}]);


  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dt, null);

  var grouped_table = new google.visualization.Table(document.getElementById('grouped_table'));
  grouped_table.draw(grouped_dt, null);
}
