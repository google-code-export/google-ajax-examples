function drawVisualization() {
  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(sortData, null);
  
  var chart = new google.visualization.BarChart(document.getElementById('chart'));
  chart.draw(sortData, null);

  google.visualization.events.addListener(table, 'sort',
      function(event) {
        sortData.sort([{column: event.column, desc: !event.ascending}]);
        chart.draw(sortData, null);
      });
}
