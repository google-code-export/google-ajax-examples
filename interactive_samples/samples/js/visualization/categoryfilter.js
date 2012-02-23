function drawVisualization() {
  // Prepare the data.
  var data = google.visualization.arrayToDataTable([
    ['Metric', 'Value'],
    ['CPU' , 12],
    ['Memory', 20],
    ['Disk', 7],
    ['Network', 54]
  ]);

  // Define a category picker for the 'Metric' column.
  var categoryPicker = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Metric',
      'ui': {
        'allowTyping': false,
        'allowMultiple': true,
        'selectedValuesLayout': 'belowStacked'
      }
    },
    // Define an initial state, i.e. a set of metrics to be initially selected.
    'state': {'selectedValues': ['CPU', 'Memory']}
  });

  // Define a gauge chart.
  var gaugeChart = new google.visualization.ChartWrapper({
    'chartType': 'Gauge',
    'containerId': 'chart1',
    'options': {
      'width': 400,
      'height': 180
    }
  });

  // Create the dashboard.
  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard')).
    // Configure the category picker to affect the gauge chart
    bind(categoryPicker, gaugeChart).
    // Draw the dashboard
    draw(data);
}
