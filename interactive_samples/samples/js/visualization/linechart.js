function drawVisualization() {
  new google.visualization.LineChart(document.getElementById('visualization')).
      draw(data, null);  
}
