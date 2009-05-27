var a = 1;
var b = (a == 1) ? 2 : 1;


var html = 'var a = 1;<br/>';
html += 'var b = (a == 1) ? 2 : 1;<br/>';
html += 'b is now = ' + b;
document.getElementById('content').innerHTML = html;