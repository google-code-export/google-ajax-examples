// To see the data that this visualization uses, browse to
// http://spreadsheets.google.com/pub?key=rYQm6lTXPH8dHA6XGhJVFsA
var query = new google.visualization.Query(
    'http://spreadsheets.google.com/tq?key=rYQm6lTXPH8dHA6XGhJVFsA&pub=1');

function sendAndDraw() {
  // Send the query with a callback function.
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  data = response.getDataTable();
  var table = new google.visualization.Table(document.getElementById('querytable'));
  table.draw(data, {'showRowNumber': true});
  if (isFirstTime) {
  init();
  }
}

function setQuery(queryString) {
  // Query language examples configured with the UI
  query.setQuery(queryString);
  sendAndDraw();
  queryInput.value = queryString;
}

