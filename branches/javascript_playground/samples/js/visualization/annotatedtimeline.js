function drawVisualization() {
  new google.visualization.Query(
  'http://spreadsheets.google.com/tq?key=pCQbetd-CptH5QNY89vLtAg&pub=1').send(
      function(response) {
        new google.visualization.AnnotatedTimeLine(
            document.getElementById('visualization')).
            draw(response.getDataTable(), {'displayAnnotations': true});
      });
}
