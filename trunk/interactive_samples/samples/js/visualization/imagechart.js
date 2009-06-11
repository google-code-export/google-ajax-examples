function drawVisualization() {
      var options = {};
      // Chart API chart type 'rs' is radar chart
      options.cht = 'rs';

      // set the line colors
      options.colors = ['#00FF00' , '#FF00FF'];

      // fill the area under the lines
      options.fill = true;
     
      // create a grid for the chart
      options.chg = '25.0,25.0,4.0,4.0';

      dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string');
      dataTable.addColumn('number');
      dataTable.addColumn('number');
      dataTable.addRows(8);

      var pi = '\u03C0';
      dataTable.setValue(0, 0, '0');
      dataTable.setValue(1, 0, pi + '/4');
      dataTable.setValue(2, 0, pi + '/2');
      dataTable.setValue(3, 0, '3' + pi + '/4');
      dataTable.setValue(4, 0, pi);
      dataTable.setValue(5, 0, '5' + pi + '/4');
      dataTable.setValue(6, 0, '3' + pi + '/2');
      dataTable.setValue(7, 0, '7' + pi + '/4');

      dataTable.setValue(0, 1, 10);
      dataTable.setValue(1, 1, 20);
      dataTable.setValue(2, 1, 30);
      dataTable.setValue(3, 1, 40);
      dataTable.setValue(4, 1, 50);
      dataTable.setValue(5, 1, 60);
      dataTable.setValue(6, 1, 70);
      dataTable.setValue(7, 1, 80);

      dataTable.setValue(0, 2, 100);
      dataTable.setValue(1, 2, 80);
      dataTable.setValue(2, 2, 60);
      dataTable.setValue(3, 2, 30);
      dataTable.setValue(4, 2, 25);
      dataTable.setValue(5, 2, 20);
      dataTable.setValue(6, 2, 10);
      dataTable.setValue(7, 2, 5);
      
      var chart = new google.visualization.ImageChart(document.getElementById('visualization'));
      chart.draw(dataTable, options);
}
