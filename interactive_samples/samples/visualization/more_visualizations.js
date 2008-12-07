function drawVisualizations() {
  new google.visualization.Query('http://spreadsheets.google.com/tq?key=pCQbetd-CptH5QNY89vLtAg').send(
      function(response) {
        new google.visualization.AnnotatedTimeLine(document.getElementById('annotatedtimeline')).draw(response.getDataTable(), null);
      });
  new google.visualization.Query('http://spreadsheets.google.com/tq?key=pCQbetd-CptE1ZQeQk8LoNw').send(
      function(response) {
        new google.visualization.MotionChart(document.getElementById('motionchart')).draw(response.getDataTable(), null);
      });
  new google.visualization.Query('http://spreadsheets.google.com/tq?key=pCQbetd-CptFdCK8zLLPaFw').send(
      function(response) {
        new google.visualization.GeoMap(document.getElementById('geomap')).draw(response.getDataTable(), null);
      });
}
