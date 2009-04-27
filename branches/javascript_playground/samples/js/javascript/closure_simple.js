/*
 * Closure is an important part of Javascript but a confusing concept to learn.
 * It is when you define a function within a function.  The best way to think
 * about a closure is that it takes a snapshot of the local context of the outer
 * function.
*/

function outerFunction(someNum) {
  someString = 'Hai!';
  var content = document.getElementById('content');
  function innerFunction() {
    // Notice that this inner function has access to the variables in the outer
    // function!
    content.innerHTML = someNum + ': ' + someString;
  }
  innerFunction();
}

outerFunction(1);