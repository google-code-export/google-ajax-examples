function drawVisualization() {
  new google.visualization.ColumnChart(document.getElementById('visualization')).
      draw(data, null);  
}
