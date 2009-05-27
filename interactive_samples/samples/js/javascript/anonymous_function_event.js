/*
 * A function that is dynamically declared with no name
*/

var contentDiv = document.getElementById('content');
// Create an onload event handler that assigns the load event to a function.
window.onload = function() {
  contentDiv.innerHTML = "Our anonymous function was called because the onload event was fired!";
};