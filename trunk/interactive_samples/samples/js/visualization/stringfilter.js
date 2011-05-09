function drawVisualization() {
  // Prepare the data.
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
    
  // Define a StringFilter control for the 'Name' column
  var stringFilter = new google.visualization.ControlWrapper({
    'controlType': 'StringFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Name'
    }
  });
  
  // Define a table visualization
  var table = new google.visualization.ChartWrapper({
    'chartType': 'Table',
    'containerId': 'chart1',
    'options': {'height': '13em', 'width': '20em'}
  });
  
  // Create the dashboard.
  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard')).
    // Configure the string filter to affect the table contents
    bind(stringFilter, table).
    // Draw the dashboard
    draw(data);    
}