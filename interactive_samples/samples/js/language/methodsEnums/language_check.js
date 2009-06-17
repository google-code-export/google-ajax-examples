   google.load('language','1');
   function init(){
    var languages=google.language.Languages,
    table=document.createElement('table'),
    tbody=document.createElement('tbody'),
    callbackClosure=function(el){return function(result){if(result.translation){el.appendChild(document.createTextNode(result.translation))}}};
    table.appendChild(tbody);
    document.getElementById('content').appendChild(table);
    for(var i in languages){
     var tr=document.createElement('tr'),
     langTd=document.createElement('td'),
     codeTd=document.createElement('td'),
     tranTd=document.createElement('td'),
     fontTd=document.createElement('td'),
     helloTd=document.createElement('td'),
     translatable=google.language.isTranslatable(languages[i]);
     langTd.appendChild(document.createTextNode(i));
     codeTd.appendChild(document.createTextNode(languages[i]));
     tranTd.appendChild(document.createTextNode(translatable?'yes':'no'));
     fontTd.appendChild(document.createTextNode(google.language.isFontRenderingSupported(languages[i])?'yes':'no'));
     if(translatable){google.language.translate('Hello, world.', 'en', languages[i], callbackClosure(helloTd));}
     tr.className=translatable?'good':'noGood';
     tr.appendChild(langTd);
     tr.appendChild(codeTd);
     tr.appendChild(tranTd);
     tr.appendChild(fontTd);
     tr.appendChild(helloTd);
     tbody.appendChild(tr);
    }
   }
   google.setOnLoadCallback(init);
