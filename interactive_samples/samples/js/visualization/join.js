function drawJoin() {
  var dt1 = google.visualization.arrayToDataTable([
    ['Name', 'Size', 'Color'],
    ['bob', 111, 'red'],
    ['bob', 111, 'green'],
    ['bob', 333, 'orange'],
    ['fred', 555, 'blue'],
    ['jane', 777, 'yellow']
  ]);

  var dt2 = google.visualization.arrayToDataTable([
    ['Name', 'Size', 'Color'],
    ['bob', 111, 'point'],
    ['ellyn', 222, 'square'],
    ['jane', 555, 'circle'],
    ['jane', 777, 'triangle'],
    ['fred', 666, 'dodecahedron']
  ]);

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
