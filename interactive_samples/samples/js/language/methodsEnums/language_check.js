   google.load('language','1');
   function init(){
    // Get the Languages array so we can be lazy
    var languages = google.language.Languages,

    // get the table
    table = document.getElementById('matrix'),

    // the callback closure for our translation later on
    callbackClosure = function(el){return function(result){if(result.translation){el.appendChild(document.createTextNode(result.translation))}}};

    // now we loop through the languages array
    for(var i in languages){
     // Create the row and cells
     var tr=document.createElement('tr'),
     langTd=document.createElement('td'),
     codeTd=document.createElement('td'),
     tranTd=document.createElement('td'),
     fontTd=document.createElement('td'),
     helloTd=document.createElement('td'),

     // check to see if the language is translatable
     translatable=google.language.isTranslatable(languages[i]);

     // Set the language cell
     langTd.appendChild(document.createTextNode(i));

     // Set the code cell
     codeTd.appendChild(document.createTextNode(languages[i]));

     // Set the translatable cell
     tranTd.appendChild(document.createTextNode(translatable ? 'yes' : 'no'));

     // Set the font renderable cell
     fontTd.appendChild(document.createTextNode(google.language.isFontRenderingSupported(languages[i]) ? 'yes' : 'no'));

     // if translatable, see what "Hello, world" comes out as
     if(i != 'UNKNOWN' && translatable){google.language.translate('Hello, world.', 'en', languages[i], callbackClosure(helloTd));}

     // set the class name for colorization
     tr.className=translatable?'good':'noGood';

     // append everything
     tr.appendChild(langTd);
     tr.appendChild(codeTd);
     tr.appendChild(tranTd);
     tr.appendChild(fontTd);
     tr.appendChild(helloTd);
     table.appendChild(tr);
    }
   }
   google.setOnLoadCallback(init);
