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
