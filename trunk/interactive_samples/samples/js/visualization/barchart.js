function drawVisualization() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  var raw_data = [['Austria', 1336060, 1538156, 1576579, 1600652, 1968113, 1901067],
                  ['Bulgaria', 400361, 366849, 440514, 434552, 393032, 517206],
                  ['Denmark', 1001582, 1119450, 993360, 1004163, 979198, 916965],
                  ['Greece', 997974, 941795, 930593, 897127, 1080887, 1056036]];

  var years = [2003, 2004, 2005, 2006, 2007, 2008];

  data.addColumn('string', 'Year');
  for (var i = 0; i  < raw_data.length; ++i) {
    data.addColumn('number', raw_data[i][0]);
  }

  data.addRows(years.length);

  for (var j = 0; j < years.length; ++j) {
    data.setValue(j, 0, years[j].toString());
  }
  for (var i = 0; i  < raw_data.length; ++i) {
    for (var j = 1; j  < raw_data[i].length; ++j) {
      data.setValue(j-1, i+1, raw_data[i][j]);
    }
  }

  // Create and draw the visualization.
  new google.visualization.BarChart(document.getElementById('visualization')).
      draw(data,
           {title:"Yearly Coffee Consumption by Country",
            width:600, height:400,
            vAxis: {title: "Year"},
            hAxis: {title: "Cups"}}
      );
}
