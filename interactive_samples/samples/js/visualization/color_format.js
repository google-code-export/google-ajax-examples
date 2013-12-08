function drawVisualization() {
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable([
    ['Department', 'Revenues'],
    ['Shoes', 10700],
    ['Sports', -15400],
    ['Toys', 12500],
    ['Electronics', -2100],
    ['Food', 22600],
    ['Art', 1100]
  ]);

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));

  var formatter = new google.visualization.ColorFormat();
  formatter.addRange(-20000, 0, 'white', 'orange');
  formatter.addRange(20000, null, 'red', '#33ff33');
  formatter.format(data, 1); // Apply formatter to second column

  table.draw(data, {allowHtml: true, showRowNumber: true});
}
