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
  db.execute('insert into Tasks (description, notsaved) values (?, 1)', [ description ]);

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

   clearTasks();

   for (var x=0; x < tasks.length; x++) {
     db.execute('insert into Tasks (description) values (?)', [ tasks[x] ]);
   }
}

window.onload = function() {
   setupDb();
   getTasks();
};
