function drawVisualization() {
  var query = new google.visualization.Query('http://spreadsheets.google.com/tq?key=pCQbetd-CptHq_AmlwWr2Tg');
  
  // Apply query language.
  query.setQuery('SELECT A,B ORDER BY B');
  
  // Send the query with a callback function.
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  visualization = new google.visualization.LineChart(document.getElementById('big_chart_1'));
  visualization.draw(data, null);
}