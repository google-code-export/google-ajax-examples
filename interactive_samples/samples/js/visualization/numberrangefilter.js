function drawVisualization() {
  // Prepare the data
  var data = google.visualization.arrayToDataTable([
    ['Name', 'Age'],
    ['Michael' , 12],
    ['Elisa', 20],
    ['Robert', 7],
    ['John', 54],
    ['Jessica', 22],
    ['Aaron', 3],
    ['Margareth', 42],
    ['Miranda', 33]
  ]);

  // Define a NumberRangeFilter slider control for the 'Age' column.
  var slider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Age',
      'minValue': 0,
      'maxValue': 60
    }
  });

  // Define a bar chart
  var barChart = new google.visualization.ChartWrapper({
    'chartType': 'BarChart',
    'containerId': 'chart1',
    'options': {
      'width': 400,
      'height': 300,
      'hAxis': {'minValue': 0, 'maxValue': 60},
      'chartArea': {top: 0, right: 0, bottom: 0}
    }
  });

  // Create the dashboard.
  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard')).
    // Configure the slider to affect the bar chart
    bind(slider, barChart).
    // Draw the dashboard
    draw(data);
}
