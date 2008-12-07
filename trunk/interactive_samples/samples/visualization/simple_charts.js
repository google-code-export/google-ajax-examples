google.load('visualization', '1', {packages: [
    'areachart',
    'imageareachart',
    'columnchart',
    'linechart',
    'imagelinechart',
    'piechart',
    'imagepiechart',
    'scatterchart',
    ], callback: drawVisualizations});

function drawVisualizations() {
  new google.visualization.AreaChart(document.getElementById('areachart')).draw(data, null);  	
  new google.visualization.ImageAreaChart(document.getElementById('imageareachart')).draw(data, null);  	
  new google.visualization.ColumnChart(document.getElementById('columnchart')).draw(data, null);  	
  new google.visualization.LineChart(document.getElementById('linechart')).draw(data, null);  	
  new google.visualization.ImageLineChart(document.getElementById('imagelinechart')).draw(data, null);  	
  new google.visualization.PieChart(document.getElementById('piechart')).draw(data, null);
  new google.visualization.ImagePieChart(document.getElementById('imagepiechart')).draw(data, null);
  new google.visualization.ScatterChart(document.getElementById('scatterchart')).draw(data, null);
}
