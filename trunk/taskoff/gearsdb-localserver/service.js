function getTasks() {
  var tasks = getLocalTasks();
  displayTasks(tasks);
  downloadTasks();
}

function getLocalTasks() {
  var tasks = [];
  var rs = db.execute('select description from Tasks order by rowid desc');
    while (rs.isValidRow()) {
      tasks.push(rs.field(0));
      rs.next();
    }
    rs.close();
    return tasks;
}

function saveRemoteTask(id, description) {
  var url = ADD_TASK_URL + description;
  downloadUrl(url, function(data) {
    if (data.length <= 1) {
      db.execute('update Tasks set notsaved=0 where id = ?', [ id ]);
    }
  });
}

function saveTask() {
  var description = document.getElementById('description').value;
  document.getElementById('description').value = '';
  
  try {
    db.execute('insert into Tasks (description, notsaved) values (?, 1)', [ description ]);
  } catch (e) {
    console.log("Error adding task: " + description + ":" + e);
  }

  saveRemoteTask(db.lastInsertRowId, description);

  getTasks();
}

function updateTasks(tasks) {
   var rs = db.execute('select id, description from Tasks where notsaved = 1');
   while (rs.isValidRow()) {
     saveRemoteTask(rs.field(0), rs.field(1));
     rs.next();
   }
   rs.close();

   db.execute('delete from Tasks'); // empty the puppy

   for (var x=0; x < tasks.length; x++) {
     db.execute('insert into Tasks (description) values (?)', [ tasks[x] ]);
   }
}

function setupStore() {
  var pageFiles = [ location.pathname, 'service.js', '../gears_init.js', '../common.js', '../style.css' ];
  var localServer;
  var storeName = 'taskoff';
  
  try {
    localServer = google.gears.factory.create('beta.localserver', '1.0');
  } catch (e) {
    alert('Could not create local server: ' + e.message);
    return;
  }

  // Load in the offline resources (js/css/etc)
  var store = localServer.openStore(storeName) || localServer.createStore(storeName);
  store.capture(pageFiles, function(url, success, captureId) {
    console.log(url + ' captured ' + (success ? 'succeeded' : 'failed'));
  });  
}

window.onload = function() {
   setupDb();
   setupStore();
   getTasks();
};

setInterval(function() { // Every now and then check
  getTasks();
}, 60000);

