function drawVisualization() {
  // Prepare the data
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Region/State', 'City', 'Population'],
    ['USA', 'California', 'San Francisco', 776733],
    ['USA', 'California', 'Los Angeles', 3694820],
    ['USA', 'California', 'Mountain View', 70708],
    ['USA', 'New York', 'New York', 8175173],
    ['USA', 'New York', 'Albany', 857592],
    ['France', 'Ile-de-France', 'Paris', 2193031],
    ['France', 'Ile-de-France', 'Orly', 21372],
    ['France', 'Provence', 'Marseille', 852395],
    ['France', 'Provence', 'Nice', 348556]
  ]);
  
  // Define category pickers for 'Country', 'Region/State' and 'City'
  var countryPicker = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'control1',
    'options': {
      'filterColumnLabel': 'Country',
      'ui': {
        'labelStacking': 'vertical',
        'allowTyping': false,
        'allowMultiple': false    
      }
    }
  });

  var regionPicker = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'control2',
    'options': {
      'filterColumnLabel': 'Region/State',
      'ui': {
        'labelStacking': 'vertical',
        'allowTyping': false,
        'allowMultiple': false    
      }
    }
  });
  
  var cityPicker = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'control3',
    'options': {
      'filterColumnLabel': 'City',
      'ui': {
        'labelStacking': 'vertical',
        'allowTyping': false,
        'allowMultiple': false    
      }
    }
  });
  
  // Define a bar chart to show 'Population' data
  var barChart = new google.visualization.ChartWrapper({
    'chartType': 'BarChart',
    'containerId': 'chart1',
    'options': {
      'width': 400,
      'height': 300,
      'chartArea': {top: 0, right: 0, bottom: 0}
    },
    // Configure the barchart to use columns 2 (City) and 3 (Population)
    'view': {'columns': [2, 3]}
  });
  
  // Create the dashboard.
  new google.visualization.Dashboard(document.getElementById('dashboard')).
    // Configure the controls so that:
    // - the 'Country' selection drives the 'Region' one,
    // - the 'Region' selection drives the 'City' one,
    // - and finally the 'City' output drives the chart
    bind(countryPicker, regionPicker).
    bind(regionPicker, cityPicker).
    bind(cityPicker, barChart).
    // Draw the dashboard
    draw(data);   
}