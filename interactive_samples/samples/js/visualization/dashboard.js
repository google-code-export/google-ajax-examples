function drawVisualization() {
  // Prepare the data
  var data = google.visualization.arrayToDataTable([
    ['Name', 'Gender', 'Age', 'Donuts eaten'],
    ['Michael' , 'Male', 12, 5],
    ['Elisa', 'Female', 20, 7],
    ['Robert', 'Male', 7, 3],
    ['John', 'Male', 54, 2],
    ['Jessica', 'Female', 22, 6],
    ['Aaron', 'Male', 3, 1],
    ['Margareth', 'Female', 42, 8],
    ['Miranda', 'Female', 33, 6]
  ]);

  // Define a slider control for the Age column.
  var slider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Age',
    'ui': {'labelStacking': 'vertical'}
    }
  });

  // Define a category picker control for the Gender column
  var categoryPicker = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'control2',
    'options': {
      'filterColumnLabel': 'Gender',
      'ui': {
      'labelStacking': 'vertical',
        'allowTyping': false,
        'allowMultiple': false
      }
    }
  });

  // Define a Pie chart
  var pie = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart1',
    'options': {
      'width': 300,
      'height': 300,
      'legend': 'none',
      'title': 'Donuts eaten per person',
      'chartArea': {'left': 15, 'top': 15, 'right': 0, 'bottom': 0},
      'pieSliceText': 'label'
    },
    // Instruct the piechart to use colums 0 (Name) and 3 (Donuts Eaten)
    // from the 'data' DataTable.
    'view': {'columns': [0, 3]}
  });

  // Define a table
  var table = new google.visualization.ChartWrapper({
    'chartType': 'Table',
    'containerId': 'chart2',
    'options': {
      'width': '300px'
    }
  });

  // Create a dashboard
  new google.visualization.Dashboard(document.getElementById('dashboard')).
      // Establish bindings, declaring the both the slider and the category
      // picker will drive both charts.
      bind([slider, categoryPicker], [pie, table]).
      // Draw the entire dashboard.
      draw(data);
}
