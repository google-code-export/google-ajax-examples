/*
 *   Anonymous functions are functions that are dynamically declared at runtime
 * that don’t have to be given a name.
 *   This sample builds upon the Anonymous function: clean namespace sample by
 * showing how you can export functions to the global namespace, so that you can
 * control what you are exposing.
 *   It does this by setting
*/

var contentDiv = document.getElementById('content');
(function() {
  var a = 1;
  function doSomething() {
    contentDiv.innerHTML += 'doSomething was called.  The value of a is: ' + a + '<br/>';
  }
  // Here we are exporting the function "doSomething" to be a function in the
  // global scope.
  window.doSomething = doSomething;
  doSomething();
})();

// This shows that the variable a is sheilded from the global namespace
contentDiv.innerHTML += 'The value of "a" outside of the anonymous function is: ' +
                        typeof a + '<br/>';  // This outputs undefined

// Since we exported doSomething to the global namespace, we can now call it
// Notice that it still has it's context and has access to the variable a
doSomething();