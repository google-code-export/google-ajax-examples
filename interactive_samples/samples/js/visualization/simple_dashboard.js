function drawVisualization() {
  // Prepare the data
  var data = google.visualization.arrayToDataTable([
    ['Name', 'Donuts eaten'],
    ['Michael' , 5],
    ['Elisa', 7],
    ['Robert', 3],
    ['John', 2],
    ['Jessica', 6],
    ['Aaron', 1],
    ['Margareth', 8]
  ]);

  // Define a slider control for the 'Donuts eaten' column
  var slider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Donuts eaten',
      'ui': {'labelStacking': 'vertical'}
    }
  });

  // Define a pie chart
  var piechart = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart1',
    'options': {
      'width': 600,
      'height': 300,
      'legend': 'bottom',
      'chartArea': {'left': 15, 'top': 15, 'right': 0, 'bottom': 0},
      'pieSliceText': 'value'
    }
  });

  // Create the dashboard.
  new google.visualization.Dashboard(document.getElementById('dashboard')).
    // Configure the slider to affect the piechart
    bind(slider, piechart).
    // Draw the dashboard
    draw(data);
}
