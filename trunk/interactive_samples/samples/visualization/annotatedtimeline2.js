function drawVisualization() {
  // Queries data from this spreadsheet: 
  // http://spreadsheets.google.com/pub?key=pCQbetd-CptH5QNY89vLtAg
  
  new google.visualization.Query(
  'http://spreadsheets.google.com/tq?key=pCQbetd-CptH5QNY89vLtAg').send(
      function(response) {
        new google.visualization.AnnotatedTimeLine(
            document.getElementById('visualization')).
            draw(response.getDataTable(), null);
      });
}
