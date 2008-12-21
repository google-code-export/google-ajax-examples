function drawVisualization() {
  new google.visualization.AreaChart(document.getElementById('visualization')).
      draw(data, null);  	
}
