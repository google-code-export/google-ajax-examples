function draw() {
  drawVisualization();
  drawToolbar();
}

function drawVisualization() {
  var container = document.getElementById('visualization_div');
  visualization = new google.visualization.PieChart(container);
  new google.visualization.Query('http://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA&pub=1').
  send(queryCallback);
}

function queryCallback(response) {
  visualization.draw(response.getDataTable(), {is3D: true});
}

function drawToolbar() {
  var components = [
    {type: 'igoogle', datasource: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA&pub=1',
      gadget: 'http://www.google.com/ig/modules/pie-chart.xml',
      userprefs: {'3d': 1}},
    {type: 'html', datasource: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA&pub=1'},
    {type: 'csv', datasource: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA&pub=1'},
    {type: 'htmlcode', datasource: 'http://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA&pub=1',
      gadget: 'http://www.google.com/ig/modules/pie-chart.xml'}
  ];

  var container = document.getElementById('toolbar_div');
  google.visualization.drawToolbar(container, components);
};
