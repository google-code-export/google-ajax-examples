/*
 * A technique for avoiding browsers' cross-domain restriction
 * Allows you to request information cross-domain from client
 * You request a script from a cross domain
 * That service must respond in JSON wrapped in a function call you specify
*/


function myFunc() {
  if (typeof console != 'undefined') {
    console.log(arguments);
  } else {
    alert('click debug button');
  }
}


var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=Dog&callback=myFunc';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);