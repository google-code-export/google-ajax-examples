function myFunc() {
  if (typeof console != 'undefined') {
    console.log(arguments);
  } else {
    alert('click debug button');
  }
}


var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=Google&callback=myFunc';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);