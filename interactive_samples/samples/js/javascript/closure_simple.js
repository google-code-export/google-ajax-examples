/*
* When a function is defined in another function and it
*    has access to the outer function's context even after
*    the outer function returns
* An important concept to learn in Javascript
*/

function outerFunction(someNum) {
  var someString = 'Hai!';
  var content = document.getElementById('content');
  function innerFunction() {
    content.innerHTML = someNum + ': ' + someString;
  }
  innerFunction();
}

outerFunction(1);