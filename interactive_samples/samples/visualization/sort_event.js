function drawVisualization() {
  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(numbersData, null);
  
  var chart = new google.visualization.BarChart(document.getElementById('big_chart_1'));
  chart.draw(numbersData, null);

  google.visualization.events.addListener(table, 'sort',
      function(event) {
        numbersData.sort([{column: event.column, desc: !event.ascending}]);
        chart.draw(numbersData, null);
      });
}
