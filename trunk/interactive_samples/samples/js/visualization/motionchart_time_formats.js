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
  data.addColumn('string', 'Fruit');
  data.addColumn(columnType, 'Time');
  data.addColumn('number', 'Sales');
  data.addColumn('number', 'Expenses');
  data.addColumn('string', 'Location');
  data.addRows([
    ['Apples', time[timeUnits][0], 1000, 300, 'East'],
    ['Oranges', time[timeUnits][0], 950, 200, 'West'],
    ['Bananas', time[timeUnits][0], 300, 250, 'West'],
    ['Apples', time[timeUnits][1], 1200, 400, 'East'],
    ['Oranges', time[timeUnits][1], 900, 150, 'West'],
    ['Bananas', time[timeUnits][1], 788, 617, 'West']
  ]);

  var motionchart = new google.visualization.MotionChart(
      document.getElementById('visualization'));
  motionchart.draw(data, {'width': 800, 'height': 400});
}

var timeUnits = 0;


