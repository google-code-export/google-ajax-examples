/* Copyright (c) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// -- URL and HTML work

var GET_TASKS_URL = "../service/gettasks.php";
var ADD_TASK_URL = "../service/addtask.php?description=";
var DELETE_TASKS_URL = "../service/deletetasks.php";

function downloadUrl(url, callback) {
  try {
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Msxml2.XMLHTTP');
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
      if (!xhr['status']) return;
    
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    }
    xhr.send('');
  } catch (e) {
    console.log("Offline: " + e);
  }
}

function downloadTasks() {
  var url = GET_TASKS_URL + "?bustCache=" + new Date().getTime();
  downloadUrl(url, function(data) {
      if (data) {
        var tasks = data.split('\n');
        if (tasks[tasks.length - 1] == '') { // nuke an empty item
          tasks.pop();
        }
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

if (!console) { window.console = {log: function(){}}; }

function clearStore() {
  google.gears.factory.create('beta.localserver', '1.0').removeStore('taskoff');
}

function clearDatabases() {
  clearTasks();
  downloadUrl(DELETE_TASKS_URL, function(noid) {});
}