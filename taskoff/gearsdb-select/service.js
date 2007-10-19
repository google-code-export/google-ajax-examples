function getTasks() {
  var tasks = getLocalTasks();
  displayTasks(tasks);

  downloadTasks();
}

function getLocalTasks() {
  var tasks = [];
  var rs = db.execute('select description from Tasks');
    while (rs.isValidRow()) {
      tasks.push(rs.field(0));
      rs.next();
    }
    rs.close();
    return tasks;
}

function updateTasks(tasks) {
   clearTasks();
   for (var x=0; x < tasks.length; x++) {
     db.execute('insert into Tasks (description) values (?)', [ tasks[x] ]);
   }
}

window.onload = function() {
   setupDb();
   getTasks();
};
