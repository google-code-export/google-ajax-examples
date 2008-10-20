var ie;
var opera;
var safari;
var gecko;


if (typeof console == 'undefined') {
  var console = {
    log : function() {}
  };
}

function readFile(relativePathToFile) {
  var curPath = location.href;
  var fileLoc = curPath.indexOf('file:///');
  var lastSlash = curPath.lastIndexOf('/');
  curPath = curPath.substring(0, lastSlash + 1);
  if (fileLoc != -1) {
    curPath = curPath.substring(fileLoc + 8);
  }
  var filepath = curPath + relativePathToFile;
  filepath = filepath.replace(/\//g, '\\');
  filepath = filepath.replace(/%20/g, ' ');

  try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  } catch (e) {
    return null;
  }
  var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
  file.initWithPath( filepath );
  if ( file.exists() == false ) {
    alert("File does not exist");
  }
  var is = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance( Components.interfaces.nsIFileInputStream );
  is.init( file,0x01, 00004, null);
  var sis = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance( Components.interfaces.nsIScriptableInputStream );
  sis.init( is );
  var output = sis.read( sis.available() );
  return output;
}

/**
* Returns an XMLHttp instance to use for asynchronous
* downloading. This method will never throw an exception, but will
* return NULL if the browser does not support XmlHttp for any reason.
* @return {XMLHttpRequest|Null}
*/
function createXmlHttpRequest() {
  try {
    if (typeof ActiveXObject != 'undefined') {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } else if (window["XMLHttpRequest"]) {
      return new XMLHttpRequest();
    }
  } catch (e) {
    changeStatus(e);
  }
  return null;
};

/**
* This functions wraps XMLHttpRequest open/send function.
* It lets you specify a URL and will call the callback if
* it gets a status code of 200.
* @param {String} url The URL to retrieve
* @param {Function} callback The function to call once retrieved.
*/
function downloadUrl(url, callback) {
  var status = -1;
  var request = createXmlHttpRequest();
  if (!request) {
    return false;
  }

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        status = request.status;
      } catch (e) {
        // Usually indicates request timed out in FF.
      }
      if (status == 200) {
        callback(request.responseText, request.status);
        request.onreadystatechange = function() {};
      }
    }
  };
  
  request.open('GET', url, true);
  try {
    request.send(null);
  } catch (e) {
    changeStatus(e);
  }
}


function deepObjCopy(dupeObj) {
    var retObj = new Object();
    if (typeof(dupeObj) == 'object') {
        if (typeof(dupeObj.length) != 'undefined')
            var retObj = new Array();
        for (var objInd in dupeObj) {   
            if (typeof(dupeObj[objInd]) == 'object') {
                retObj[objInd] = deepObjCopy(dupeObj[objInd]);
            } else if (typeof(dupeObj[objInd]) == 'string') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'number') {
                retObj[objInd] = dupeObj[objInd];
            } else if (typeof(dupeObj[objInd]) == 'boolean') {
                ((dupeObj[objInd] == true) ? retObj[objInd] = true : retObj[objInd] = false);
            }
        }
    }
    return retObj;
}

function singleLevelKeyCopy(dupeObj) {
	var retObj = new Object();
	for (var objInd in dupeObj) {
		retObj[objInd] = true;
	}
	return retObj;
}

function browserFun() {
  // Browser fun.
  if (window.ActiveXObject) {
    ie = this[window.XMLHttpRequest ? 'ie7' : 'ie6'] = true;
  } else if (window.opera) {
    opera = true;
  } else if (document.childNodes && !document.all && !navigator.taintEnabled) {
    safari = true;
  } else if (document.getBoxObjectFor != null) {
    gecko = true;
  }
}

function _cel(name) {
  return document.createElement(name);
}

function _gel(name) {
  return document.getElementById(name);
}

function addEvent(a,b,c,d) {
  if (a.addEventListener) {
    a.addEventListener(b,c,d?true:false);
  } else if(a.attachEvent) {
    a.attachEvent('on'+b,c);
  } else{
    a['on'+b]=c;
  }
}

browserFun();