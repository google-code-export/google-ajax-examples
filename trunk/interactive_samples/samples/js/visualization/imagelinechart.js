function drawVisualization() {
  new google.visualization.ImageLineChart(document.getElementById('visualization')).
      draw(data, null);  
}
