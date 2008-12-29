function drawVisualization() {
  new google.visualization.ImageAreaChart(document.getElementById('visualization')).
      draw(data, null);  
}
