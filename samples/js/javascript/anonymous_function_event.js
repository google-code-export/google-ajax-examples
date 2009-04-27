/*
 *   Anonymous functions are functions that are dynamically declared at runtime
 * that don’t have to be given a name.  This sample shows how to give assign an
 * event handler an anonymous function
*/

var contentDiv = document.getElementById('content');
// Create an onload event handler that assigns the load event to a function.
window.onload = function() {
  contentDiv.innerHTML = "Our anonymous function was called because the onload event was fired!";
};