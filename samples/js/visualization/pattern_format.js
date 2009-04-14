function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('string', 'Email');
  data.addRows(4);
  data.setCell(0, 0, 'John Lennon');
  data.setCell(0, 1, 'john@beatles.co.uk');
  data.setCell(1, 0, 'Paul McCartney');
  data.setCell(1, 1, 'paul@beatles.co.uk');
  data.setCell(2, 0, 'George Harrison');
  data.setCell(2, 1, 'george@beatles.co.uk');
  data.setCell(3, 0, 'Ringo Starr');
  data.setCell(3, 1, 'ringo@beatles.co.uk');

  // Create and draw the visualization.
  var table = new google.visualization.Table(document.getElementById('visualization'));
	  
  var formatter = new google.visualization.TablePatternFormat('<a href="mailto:{1}">{0}</a>');
  formatter.format(data, [0, 1]); // Apply formatter and set the formatted value of the first column.

  var view = new google.visualization.DataView(data);
  view.setColumns([0]); // Create a view with the first column only.
	  
  table.draw(view, {allowHtml: true, showRowNumber: true});
}
