function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Manager');
  data.addColumn('string', 'ToolTip');
  data.addRows(5);
  data.setCell(0, 0, 'Mike');
  data.setCell(0, 2, 'The President');
  data.setCell(1, 0,
      'Jim', 'Jim<br/><font color="red"><i>Vice President<i></font>');
  data.setCell(1, 1, 'Mike');
  data.setCell(2, 0, 'Alice');
  data.setCell(2, 1, 'Mike');
  data.setCell(3, 0, 'Bob');
  data.setCell(3, 1, 'Jim');
  data.setCell(3, 2, 'Bob Sponge');
  data.setCell(4, 0, 'Carol');
  data.setCell(4, 1, 'Bob');

  // Create and draw the visualization.
  new google.visualization.OrgChart(document.getElementById('visualization')).
      draw(data, {allowHtml: true});
}
