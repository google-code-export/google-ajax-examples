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
  data.addRows([
    [new Date(2009, 1 ,1), 30000, null, null, 4645, null, null, 12345],
    [new Date(2009, 1 ,2), 14045, null, null, 2374, null, null, 44444],
    [new Date(2009, 1 ,3), 55022, null, null, 5766, null, null, 76545],
    [new Date(2009, 1 ,4), 75284, null, null, 1334, 'Out of Stock', 'Ran out of stock on pens at 4pm', 16345],
    [new Date(2009, 1 ,5), 41476, 'Bought Pens', 'Bought 200k pens', 6467, null, null, 41345],
    [new Date(2009, 1 ,6), 33322, null, null, 3463, null, null, 33665]
  ]);

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
