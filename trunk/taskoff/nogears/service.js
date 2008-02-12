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

function saveTask() {
  document.getElementById("tasklist").innerHTML = "Task added.";
  var description = escape(document.getElementById("description").value);

  var url = ADD_TASK_URL + description; 
  downloadUrl(url, function(data) {
    if (data.length <= 1) {
      getTasks();
      document.getElementById("tasklist").innerHTML = "";
    }
  });
  document.getElementById("description").value = "";
}

function getTasks() {
  downloadUrl(GET_TASKS_URL, function(data) {
      displayTasks(data.split('\n'));
  });
} 

window.onload = function() {
  getTasks();
}
