function drawVisualization() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addRows(3);
  data.setCell(0, 0, 'Haim');
  data.setCell(1, 0, 'Moshe');
  data.setCell(2, 0, 'King');
	
  visualization = new google.visualization.Table(document.getElementById('table'));
  visualization.draw(data, null);
}
