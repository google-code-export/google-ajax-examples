function drawVisualization() {
  // Create and populate the data table.
  var data = google.visualization.arrayToDataTable([
    ['Name', 'Email'],
    ['John Lennon', 'john@beatles.co.uk'],
    ['Paul McCartney', 'paul@beatles.co.uk'],
    ['George Harrison', 'george@beatles.co.uk'],
    ['Ringo Starr', 'ringo@beatles.co.uk']
  ]);

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));

  var formatter = new google.visualization.PatternFormat('<a href="mailto:{1}">{0}</a>');
  formatter.format(data, [0, 1]); // Apply formatter and set the formatted value of the first column.

  var view = new google.visualization.DataView(data);
  view.setColumns([0]); // Create a view with the first column only.

  table.draw(view, {allowHtml: true, showRowNumber: true});
}
