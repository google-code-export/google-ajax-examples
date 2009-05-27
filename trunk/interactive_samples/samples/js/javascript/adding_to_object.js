/*
 * You can add properties to an object dynamically
 * Objects are like hash tables, just key value pairs
*/

// create object a
var a = {};

// Add property1 to a
a.property1 = 1;

// Add property2 to a
a['property2'] = 2;

// Add function 'function3' to a
a.function3 = function() {
  return this['property1'] + this.property2;
};

var html = 'a["property1"] + a.property2 = ' + a.function3();
document.getElementById('content').innerHTML = html;