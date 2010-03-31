function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task');
  data.addColumn('number', 'Hours per Day');
  data.addRows(5);
  data.setValue(0, 0, 'Work');
  data.setValue(0, 1, 11);
  data.setValue(1, 0, 'Eat');
  data.setValue(1, 1, 2);
  data.setValue(2, 0, 'Commute');
  data.setValue(2, 1, 2);
  data.setValue(3, 0, 'Watch TV');
  data.setValue(3, 1, 2);
  data.setValue(4, 0, 'Sleep');
  data.setValue(4, 1, 7);

  // Create and draw the visualization.
  new google.visualization.PieChart(document.getElementById('visualization')).
      draw(data, {title:"So, how was your day?"});
}
