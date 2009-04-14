function handleButtonClick() {
  alert('button clicked!');
  drawVisualization();
}

function drawVisualization() {
  var query = new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptH5QNY89vLtAg&pub=1');
  query.send(handleResponse);
}

function handleResponse(response) {
  var container = document.getElementById('visualization');
  var annotatedtimeline = new google.visualization.AnnotatedTimeLine(container);
  annotatedtimeline.draw(response.getDataTable(), {'displayAnnotations': true});
  google.visualization.events.addListener(annotatedtimeline, 'ready',
    function(event) {
      alert('annotatedtimeline is ready, master!');
    });
}