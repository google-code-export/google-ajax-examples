function drawJoin() {
  var dt = new google.visualization.DataTable();
  dt.addColumn('number', 'Department Number');
  dt.addColumn('string', 'First Name');
  dt.addColumn('string', 'Last Name');
  dt.addColumn('number', 'Sales');
  dt.addRow([1, 'john', 'doe', 10]);
  dt.addRow([1, 'jane', 'doe', 100]);
  dt.addRow([3, 'jill', 'jones', 50]);
  dt.addRow([3, 'jack', 'jones', 75]);
  dt.addRow([5, 'al', 'weisenheimer', 500]);

  // Group dt by column 0, and show column 3 aggregated by sum.
  var grouped_dt = google.visualization.data.group(
      dt, [0],
      [{'column': 3, 'aggregation': google.visualization.data.sum, 'type': 'number'}]);


  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dt, null);

  var grouped_table = new google.visualization.Table(document.getElementById('grouped_table'));
  grouped_table.draw(grouped_dt, null);
}
