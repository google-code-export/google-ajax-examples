function drawVisualization() {
  // Uses data from the same DataTable as shown in the Table example above. 
  // Use "Code Menu -> View full Source" to see the full HTML source code.

  new google.visualization.ImageLineChart(document.getElementById('visualization')).
      draw(data, null);  
}
