function drawVisualization() {
  new google.visualization.ScatterChart(document.getElementById('visualization')).
      draw(data, null);  
}
