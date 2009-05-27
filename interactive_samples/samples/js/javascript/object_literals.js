/*
 * An Object Literal is a format for defining an object in Javascript.
 * It's comma separated list of the properties/methods of that object.
 * Dynamic way to create objects.
 * Used for creating a 'Singleton'.
*/

var a = {
  one : 1,
  arr : ['one','two','three'],
  doThis : function(){return 20;},
  two : 2
};

var html = 'a.one = ' + a.one + '<br/>';
html += 'a.arr[0] = ' + a.arr[0] + '<br/>';
html += 'a.doThis() = ' + a.doThis() + '<br/>';
html += 'a.two = ' + a.two;

document.getElementById('content').innerHTML = html;
