function drawVisualization() {
  var query = new google.visualization.Query(
      'http://spreadsheets.google.com/tq?key=pCQbetd-CptGXxxQIG7VFIQ&pub=1');
  
  // Apply query language.
  query.setQuery('SELECT A,D WHERE D > 100 ORDER BY D');
  
  // Send the query with a callback function.
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  visualization = new google.visualization.LineChart(document.getElementById('visualization'));
  visualization.draw(data, {legend: 'bottom'});
}