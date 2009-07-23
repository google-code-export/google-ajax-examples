// This function applies color formatting to a bar chart,
// by calculating the color of each bar based on the data.
function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string');
  data.addColumn('number');
  data.addRows([
    ['a', 14],
    ['b', 47],
    ['c', 80],
    ['d', 55],
    ['e', 16],
    ['f', 90],
    ['g', 29],
    ['h', 23],
    ['i', 58],
    ['j', 48]
  ]);
  
  var red = 'ff0000';
  var green = '00ff00';
  var yellow = 'ffff00';
  
  // Loop over the data table to create the color specification. 
  var colors = [];
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var value = data.getValue(i, 1);
    var color = value < 20 ? red : (value < 80 ? yellow : green);
    colors.push(color);
  }
  colors = colors.join('|');

  var options = {cht: 'bvs', chco: colors, max: 100};

  // Create and draw the visualization.
  new google.visualization.ImageChart(document.getElementById('visualization')).
    draw(data, options);  
}
