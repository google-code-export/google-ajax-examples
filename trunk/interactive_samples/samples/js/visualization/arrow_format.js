function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Department');
  data.addColumn('number', 'Revenues Change');
  data.addRows([
    ['Computer', {v: 12, f: '12.0%'}],
    ['Sports', {v: -7.3, f: '-7.3%'}],
    ['Toys', {v: 0, f: '0%'}],
    ['Electronics', {v: -2.1, f: '-2.1%'}],
    ['Food', {v: 22, f: '22.0%'}]
  ]);

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));

  var formatter = new google.visualization.TableArrowFormat();
  formatter.format(data, 1); // Apply formatter to second column

  table.draw(data, {allowHtml: true, showRowNumber: true});
}
