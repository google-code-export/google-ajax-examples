/* 
 *   Anonymous functions are functions that are dynamically declared at runtime
 * that don’t have to be given a name.
 *   This sample shows how to use an anonymous function to keep the global
 * namespace (window object) clean.  The purpose of this is to keep your code
 * from interfering with other code in the global namespace, which can occur
 * especially when using 3rd party Javascript libraries.
 *   All you have to do is wrap your code inside of this
 * (function() { // CODE HERE })();
 * This code creates a new anonymous function with your code in it, and then
 * executes this function which will initialize your code, but keep it out of
 * the window object.
*/

var contentDiv = document.getElementById('content');
(function() {
  function doSomething() {
    // really, do something!
  }
  // Within this anonymous function, tellMeTheTime exists!
  // typeof tellMeTheTime outputs 'function'
  contentDiv.innerHTML = '_Inside_ of the anonymous function, the type of doSomething is: ' +
                         typeof doSomething + '<br/>';
})();

  // Outside of the anonymous function, tellMeTheTime is nowhere to be seen.
// typeof tellMeTheTime outputs 'undefined'
contentDiv.innerHTML += '_Outside_ of the anonymous function, the type of doSomething is: ' +
                       typeof doSomething;