google.load('visualization', '1', {packages: [
    'areachart',
    'imageareachart',
    'columnchart',
    'linechart',
    'imagelinechart',
    'scatterchart',
    ], callback: drawVisualizations});

function drawVisualizations() {
  new google.visualization.AreaChart(document.getElementById('areachart')).draw(data, null);  	
  new google.visualization.ImageAreaChart(document.getElementById('imageareachart')).draw(data, null);  	
  new google.visualization.ColumnChart(document.getElementById('columnchart')).draw(data, null);  	
  new google.visualization.LineChart(document.getElementById('linechart')).draw(data, null);  	
  new google.visualization.ImageLineChart(document.getElementById('imagelinechart')).draw(data, null);  	
  new google.visualization.ScatterChart(document.getElementById('scatterchart')).draw(data, null);
}
