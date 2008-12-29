function drawVisualization() {
  // Queries data from this spreadsheet: 
  // http://spreadsheets.google.com/pub?key=pCQbetd-CptFdCK8zLLPaFw
  
  new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptFdCK8zLLPaFw').send(
          function(response) {
        new google.visualization.GeoMap(
            document.getElementById('visualization')).
            draw(response.getDataTable(), null);
          });
}
