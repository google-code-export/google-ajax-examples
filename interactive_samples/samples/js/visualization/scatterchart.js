function drawVisualization() {
    // Create and populate the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Age');
    data.addColumn('number', 'Weight');
    data.addRows(6);
    data.setValue(0, 0, 8);
    data.setValue(0, 1, 12);
    data.setValue(1, 0, 4);
    data.setValue(1, 1, 5.5);
    data.setValue(2, 0, 11);
    data.setValue(2, 1, 14);
    data.setValue(3, 0, 4);
    data.setValue(3, 1, 5);
    data.setValue(4, 0, 3);
    data.setValue(4, 1, 3.5);
    data.setValue(5, 0, 6.5);
    data.setValue(5, 1, 7);

    // Create and draw the visualization.
    new google.visualization.ScatterChart(document.getElementById('visualization')).
	draw(data, {titleX: 'Age', titleY: 'Weight', legend: 'none'});  
}

