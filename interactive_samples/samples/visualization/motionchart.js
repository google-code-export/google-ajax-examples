function drawVisualization() {
  // Queries data from this spreadsheet: 
  // http://spreadsheets.google.com/pub?key=pCQbetd-CptE1ZQeQk8LoNw

  new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptE1ZQeQk8LoNw').send(
      function(response) {
        new google.visualization.MotionChart(
            document.getElementById('visualization')).
            draw(response.getDataTable(), {'width': 800, 'height': 400});
      });
}
