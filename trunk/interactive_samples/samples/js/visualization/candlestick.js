function drawVisualization() {
   // Populate the data table.
    var dataTable = google.visualization.arrayToDataTable([
       ['Mon',20,28,38,45],
       ['Tues',31,38,55,66],
       ['Wed',50,55,77,80],
       ['Thurs',77,77,66,50],
       ['Fri',68,66,22,15],
    ], true);

    // Draw the chart.
    var chart = new google.visualization.CandlestickChart(document.getElementById('visualization'));
    chart.draw(dataTable, {legend:'none', width:600, height:400});
}
