function drawGauge() {
  gaugeData = google.visualization.arrayToDataTable([
    ['Engine', 'Torpedo'],
    [120, 80]
  ]);

  gauge = new google.visualization.Gauge(document.getElementById('gauge'));
  gaugeOptions = {
      min: 0,
      max: 280,
      yellowFrom: 200,
      yellowTo: 250,
      redFrom: 250,
      redTo: 280,
      minorTicks: 5
  };
  gauge.draw(gaugeData, gaugeOptions);
}

function changeTemp(dir) {
  gaugeData.setValue(0, 0, gaugeData.getValue(0, 0) + dir * 25);
  gaugeData.setValue(0, 1, gaugeData.getValue(0, 1) + dir * 20);
  gauge.draw(gaugeData, gaugeOptions);
}

