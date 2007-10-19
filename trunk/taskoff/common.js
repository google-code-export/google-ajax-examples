// -- URL and HTML work

var GET_TASKS_URL = "../service/gettasks.php";
var ADD_TASK_URL = "../service/addtask.php?description=";
var DELETE_TASKS_URL = "../service/deletetasks.php";

function downloadUrl(url, callback) {
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Msxml2.XMLHTTP');
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  }
  xhr.send('');
}

function downloadTasks() {
  downloadUrl(GET_TASKS_URL, function(data) {
      if (data) {
        var tasks = data.split('\n');
        displayTasks(tasks);
        updateTasks(tasks);
      }
  });
}

function displayTasks(tasks) {
  document.getElementById('tasklist').innerHTML = tasks.join('<br />');
}

// -- Database Common Functions

var db;

function setupDb() {
  db = google.gears.factory.create('beta.database', '1.0');
  db.open('tasks');

  if (db) {
    db.execute('create table if not exists Tasks (description varchar(255))');
  }
}

function clearTasks() {
  db.execute('delete from Tasks');
}


// -- DEBUG

function clearStore() {
  google.gears.factory.create('beta.localserver', '1.0').removeStore('taskoff');
}

function clearDatabases() {
  clearTasks();
  downloadUrl(DELETE_TASKS_URL, function(noid) {});
}