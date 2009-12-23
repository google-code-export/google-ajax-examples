function drawJoin() {
  var dt1 = new google.visualization.DataTable();
  dt1.addColumn('string', 'Name');
  dt1.addColumn('number', 'Size');
  dt1.addColumn('string', 'Color');
  dt1.addRow(['bob', 111, 'red']);
  dt1.addRow(['bob', 111, 'green']);
  dt1.addRow(['bob', 333, 'orange']);
  dt1.addRow(['fred', 555, 'blue']);
  dt1.addRow(['jane', 777, 'yellow']);

  var dt2 = new google.visualization.DataTable();
  dt2.addColumn('string', 'Name');
  dt2.addColumn('number', 'Size');
  dt2.addColumn('string', 'Color');
  dt2.addRow(['bob', 111, 'point']);
  dt2.addRow(['ellyn', 222, 'square']);
  dt2.addRow(['jane', 555, 'circle']);
  dt2.addRow(['jane', 777, 'triangle']);
  dt2.addRow(['fred', 666, 'dodecahedron']);

  // Create an inner join of dt1 and dt2, using columns 0 and 1 as the keys,
  // and including column 2 from both dt1 and dt2.
  var joined_dt = google.visualization.data.join(dt1, dt2, 'inner', [[0,0],[1,1]], [2], [2]);

  var table1 = new google.visualization.Table(document.getElementById('table1'));
  table1.draw(dt1, null);

  var table2 = new google.visualization.Table(document.getElementById('table2'));
  table2.draw(dt2, null);

  var joined_table = new google.visualization.Table(document.getElementById('joined_table'));
  joined_table.draw(joined_dt, null);
}
