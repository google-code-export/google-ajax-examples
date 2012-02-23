var slider;
var piechart;

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
  slider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'control',
    'options': {
      'filterColumnLabel': 'Donuts eaten',
      'ui': {'labelStacking': 'vertical'}
    }
  });

  // Define a pie chart
  piechart = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart',
    'options': {
      'width': 600,
      'height': 300,
      'legend': 'none',
      'chartArea': {'left': 15, 'top': 15, 'right': 0, 'bottom': 0},
      'pieSliceText': 'value'
    }
  });

  // Create the dashboard
  var dashboard = new google.visualization.Dashboard(
      document.getElementById('dashboard'));

  // Register a listener to be notified once the dashboard is ready.
  google.visualization.events.addListener(dashboard, 'ready', dashboardReady);

  // Configure the dashboard so that the slider to affect the piechart,
  // then draw the dashboard.
  dashboard.bind(slider, piechart).draw(data);
}

function dashboardReady() {
  // The dashboard is ready to accept interaction. Configure the buttons to
  // programmatically affect the dashboard when clicked.

  // Change the slider selected range when clicked.
  document.getElementById('rangeButton').onclick = function() {
    slider.setState({'lowValue': 2, 'highValue': 5});
    slider.draw();
  };

  // Change the pie chart rendering options when clicked.
  document.getElementById('optionsButton').onclick = function() {
    piechart.setOption('is3D', true);
    piechart.draw();
  };
}
