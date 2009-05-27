/*
 * You can define or redefine prototypes for existing objects
 * Including for native Javascript types
 * VERY DANGEROUS - THIS IS A BAD EXAMPLE
*/

// Modify all strings' concat function to also take a delimeter.
String.prototype.concat = function(str1, delimeter) {
  return this + delimeter + str1;
};

// Add a method to print a string backwards!
String.prototype.reverse = function() {
  var reverse = '';
  for (var i = this.length - 1; i >= 0; i--){
    reverse += this[i]
  }
  return reverse;
};

var a = 'abc';
var b = 'def';
var html = 'a = ' + a + '<br/>';
html += 'b = ' + b + '<br/>';
html += 'a.concat(b, \'|\') = ' + a.concat(b, '|') + '<br/>';
html += 'a.reverse() = ' + a.reverse();
document.getElementById('content').innerHTML = html;