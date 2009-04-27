function myFunc() {
  var a = 1;
  alert(a);
}

var functionAsString = myFunc.toString() + 'myFunc();';
document.getElementById('content').innerHTML = functionAsString;