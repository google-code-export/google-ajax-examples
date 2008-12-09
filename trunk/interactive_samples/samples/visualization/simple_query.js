function drawVisualization() {
  var query = new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&range=B1:D11');
  
  // Send the query with a callback function.
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  visualization = new google.visualization.IntensityMap(document.getElementById('big_chart_1'));
  visualization.draw(data, null);
}