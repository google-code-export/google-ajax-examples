function drawVisualization() {
      var options = {};
      // In the Chart API, finance chart is considered a line chart
      options.cht = 'lc';

      // set the line colors to transparent
      options.color = '#00000000';
     
      // create a grid for the chart
      options.chg = '25.0,25.0,4.0,4.0';
  
      options.chm = 'F,,0,-1,20,0';
  
      options.width = 400;

      dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string');
      dataTable.addColumn('number');
      dataTable.addColumn('number');
      dataTable.addColumn('number');
      dataTable.addColumn('number');
      dataTable.addRows(8);

      dataTable.setValue(0, 0, 'ABCD');
      dataTable.setValue(1, 0, 'EFGH');
      dataTable.setValue(2, 0, 'IJKL');
      dataTable.setValue(3, 0, 'MNOP');
      dataTable.setValue(4, 0, 'QRST');
      dataTable.setValue(5, 0, 'UVWX');
      dataTable.setValue(6, 0, 'YZAB');
      dataTable.setValue(7, 0, 'CDEF');

      dataTable.setValue(0, 1, 90);
      dataTable.setValue(1, 1, 70);
      dataTable.setValue(2, 1, 50);
      dataTable.setValue(3, 1, 20);
      dataTable.setValue(4, 1, 15);
      dataTable.setValue(5, 1, 10);
      dataTable.setValue(6, 1, 0);
      dataTable.setValue(7, 1, 0);

      dataTable.setValue(0, 2, 100);
      dataTable.setValue(1, 2, 80);
      dataTable.setValue(2, 2, 60);
      dataTable.setValue(3, 2, 30);
      dataTable.setValue(4, 2, 45);
      dataTable.setValue(5, 2, 20);
      dataTable.setValue(6, 2, 30);
      dataTable.setValue(7, 2, 5);

      dataTable.setValue(0, 3, 110);
      dataTable.setValue(1, 3, 90);
      dataTable.setValue(2, 3, 70);
      dataTable.setValue(3, 3, 40);
      dataTable.setValue(4, 3, 35);
      dataTable.setValue(5, 3, 30);
      dataTable.setValue(6, 3, 20);
      dataTable.setValue(7, 3, 15);

      dataTable.setValue(0, 4, 120);
      dataTable.setValue(1, 4, 100);
      dataTable.setValue(2, 4, 80);
      dataTable.setValue(3, 4, 50);
      dataTable.setValue(4, 4, 55);
      dataTable.setValue(5, 4, 40);
      dataTable.setValue(6, 4, 40);
      dataTable.setValue(7, 4, 25);
      
      var chart = new google.visualization.ImageChart(document.getElementById('visualization'));
      chart.draw(dataTable, options);
}
