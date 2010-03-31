function drawVisualization() {
    // Create and populate the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y1');
    data.addColumn('number', 'Y2');
    for (var i = 0; i < 500; ++i) {
      data.addRow([Math.sin(i / 5) * 0.25, Math.cos(i / 25), null])
    }
    for (var i = 0; i < 500; i++) {
      data.addRow([Math.sin(i / 25), null, Math.cos(i / 10) * 0.5]);
    }

    // Create and draw the visualization.
    var chart = new google.visualization.ScatterChart(
        document.getElementById('visualization'));
    chart.draw(data, {titleX: 'X', titleY: 'Y', legend: 'none',
                      width:600, height: 400});  
}

