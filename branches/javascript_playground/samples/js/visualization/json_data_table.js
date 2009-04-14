function drawVisualization() {
  // Create and populate the data table.
  var JSONObject = {
      cols: [{id: 'task', label: 'Task', type: 'string'},
          {id: 'hours', label: 'Hours per Day', type: 'number'}],
      rows: [{c:[{v: 'Work'}, {v: 11}]},
          {c:[{v: 'Eat'}, {v: 2}]},
          {c:[{v: 'Commute'}, {v: 2, f: '2.000'}]}]};

  var data = new google.visualization.DataTable(JSONObject);

  // Create and draw the visualization.
  visualization = new google.visualization.Table(document.getElementById('table'));
  visualization.draw(data, null);
}
