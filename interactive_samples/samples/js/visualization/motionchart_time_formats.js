function drawVisualization() {
	
  var time = [['2000W01', '2000W02'], 
              ['2002Q3', '2002Q4'],
              [1990, 1991], 
              [(new Date(2000, 0, 1)), (new Date(2000, 0, 2))]];
  
  var columnType;
  switch (timeUnits) {
   case 0:
   case 1:
     columnType = 'string';
     break;
   case 2:
	 columnType = 'number';
	 break;
   case 3:
	 columnType = 'date';
	 break;  
  }
  
  var data = new google.visualization.DataTable();
  data.addRows(6);
  data.addColumn('string', 'Fruit');
  data.addColumn(columnType, 'Time');
  data.addColumn('number', 'Sales');
  data.addColumn('number', 'Expenses');
  data.addColumn('string', 'Location');
  data.setValue(0, 0, 'Apples');
  data.setValue(0, 1, time[timeUnits][0]);
  data.setValue(0, 2, 1000);
  data.setValue(0, 3, 300);
  data.setValue(0, 4, 'East');
  data.setValue(1, 0, 'Oranges');
  data.setValue(1, 1, time[timeUnits][0]);
  data.setValue(1, 2, 950);
  data.setValue(1, 3, 200);
  data.setValue(1, 4, 'West');
  data.setValue(2, 0, 'Bananas');
  data.setValue(2, 1, time[timeUnits][0]);
  data.setValue(2, 2, 300);
  data.setValue(2, 3, 250);
  data.setValue(2, 4, 'West');
  data.setValue(3, 0, 'Apples');
  data.setValue(3, 1, time[timeUnits][1]);
  data.setValue(3, 2, 1200);
  data.setValue(3, 3, 400);
  data.setValue(3, 4, "East");
  data.setValue(4, 0, 'Oranges');
  data.setValue(4, 1, time[timeUnits][1]);
  data.setValue(4, 2, 900);
  data.setValue(4, 3, 150);
  data.setValue(4, 4, "West");
  data.setValue(5, 0, 'Bananas');
  data.setValue(5, 1, time[timeUnits][1]);
  data.setValue(5, 2, 788);
  data.setValue(5, 3, 617);
  data.setValue(5, 4, "West");

  var motionchart = new google.visualization.MotionChart(
      document.getElementById('visualization'));
  motionchart.draw(data, {'width': 800, 'height': 400});
}

var timeUnits = 0;


