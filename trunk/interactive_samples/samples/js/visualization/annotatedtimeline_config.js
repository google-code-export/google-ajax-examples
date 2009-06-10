function drawVisualization() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Sold Pencils');
  data.addColumn('string', 'title1');
  data.addColumn('string', 'text1');
  data.addColumn('number', 'Sold Pens');
  data.addColumn('string', 'title2');
  data.addColumn('string', 'text2');
  data.addColumn('number', 'Sold Papers');
  data.addRows(6);
  data.setValue(0, 0, new Date(2009, 1 ,1));
  data.setValue(0, 1, 30000);
  data.setValue(0, 4, 4645);
  data.setValue(0, 7, 12345);
  data.setValue(1, 0, new Date(2009, 1 ,2));
  data.setValue(1, 1, 14045);
  data.setValue(1, 4, 2374);
  data.setValue(1, 7, 44444);
  data.setValue(2, 0, new Date(2009, 1 ,3));
  data.setValue(2, 1, 55022);
  data.setValue(2, 4, 5766);
  data.setValue(2, 7, 76545);
  data.setValue(3, 0, new Date(2009, 1 ,4));
  data.setValue(3, 1, 75284);
  data.setValue(3, 4, 1334);
  data.setValue(3, 5, 'Out of Stock');
  data.setValue(3, 6, 'Ran out of stock on pens at 4pm');
  data.setValue(3, 7, 16345); 
  data.setValue(4, 0, new Date(2009, 1 ,5));
  data.setValue(4, 1, 41476);
  data.setValue(4, 2, 'Bought Pens');
  data.setValue(4, 3, 'Bought 200k pens');
  data.setValue(4, 4, 6467);
  data.setValue(4, 7, 41345);
  data.setValue(5, 0, new Date(2009, 1 ,6));
  data.setValue(5, 1, 33322);
  data.setValue(5, 4, 3463);
  data.setValue(5, 7, 33665);
 
  var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
      document.getElementById('visualization'));
  annotatedtimeline.draw(data, {
                                //'allValuesSuffix': '%', // A suffix that is added to all values
                                'colors': ['blue', 'red', '#0000bb'], // The colors to be used
                                'displayAnnotations': true,
                                'displayExactValues': true, // Do not truncate values (i.e. using K suffix)
                                'displayRangeSelector' : false, // Do not sow the range selector
                                'displayZoomButtons': false, // DO not display the zoom buttons
                                'fill': 30, // Fill the area below the lines with 20% opacity
                                'legendPosition': 'newRow', // Can be sameRow
                                //'max': 100000, // Override the automatic default
                                //'min':  100000, // Override the automatic default
                                'scaleColumns': [0, 1], // Have two scales, by the first and second lines
                                'scaleType': 'allfixed', // See docs...
                                'thickness': 2, // Make the lines thicker
                                'zoomStartTime': new Date(2009, 1 ,2), //NOTE: month 1 = Feb (javascript to blame)
                                'zoomEndTime': new Date(2009, 1 ,5) //NOTE: month 1 = Feb (javascript to blame)
                               });
}