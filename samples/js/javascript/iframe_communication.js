// ONLY WORKS IN THE SAME DOMAIN


var iframe = document.createElement('iframe');
iframe.contentWindow.document.open();
iframe.contentWindow.document.write('<script>alert("hi");</script>');
iframe.contentWindow.document.close();
document.body.appendChild(iframe);