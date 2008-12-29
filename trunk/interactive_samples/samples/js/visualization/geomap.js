function drawVisualization() {
  new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptFdCK8zLLPaFw').send(
          function(response) {
        new google.visualization.GeoMap(
            document.getElementById('visualization')).
            draw(response.getDataTable(), null);
          });
}
