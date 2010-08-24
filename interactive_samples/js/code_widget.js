var playground = {};
playground.CodeWidget = function(options) {
  if (typeof options.container == 'undefined') {
    throw playground.CodeWidget.errorPrefix + 'Specify a container!';
  } else if (typeof options.container.toLowerCase() == 'string') {
    options.container = document.getElementById(options.container);
  }
  this.options_ = options;
  this.host_ = '//' + (this.options_.devaddress || 'code.google.com');
  if (this.options_.editorHeight == 'auto') {
    this.options_.container.style.height = '0px';
  } else {
    this.options_.container.style.height = this.options_.editorHeight ||
      playground.CodeWidget.defaultEditorHeight_;
  }
  if (this.options_.width && this.options_.width != 'auto') {
    this.options_.container.style.width = this.options_.width;
  }

  if (this.options_.editorBorder) {
    this.options_.container.style.border = this.options_.editorBorder;
  }

  this.options_.container.innerHTML = '';

  if (!playground.CodeWidget.isCodeMirrorScriptLoaded_()) {
    var codemirrorScript = document.createElement('script');
    codemirrorScript.src = this.host_ + '/apis/ajax/playground' +
        '/codemirror/js/prod_codemirrorz_5b6d8fa21fb3d7fd8f309cf6e62b8c1b.js';
    if (window.navigator.userAgent.indexOf('MSIE') != -1) {
      codemirrorScript.onreadystatechange =
        playground.CodeWidget.codeMirrorScriptCb_;
    } else {
      codemirrorScript.onload = playground.CodeWidget.codeMirrorScriptCb_;
    }
    document.body.appendChild(codemirrorScript);
    playground.CodeWidget.widgetsWaitingToLoad_.push(this);
  }
}
// A cache of the code we've already pulled down.  Don't pull things down
// twice!
playground.CodeWidget.codeCache = {};
playground.CodeWidget.widgetsWaitingToLoad_ = [];
playground.CodeWidget.insertJavascriptRegex = /[ ]*{{ INSERT_JAVASCRIPT_HERE }}/;
playground.CodeWidget.contextToInstance = [];
playground.CodeWidget.defaultHeight_ = '0px';
playground.CodeWidget.errorPrefix = 'playground.CodeWidget: ';
playground.CodeWidget.codeMirrorScriptLoaded = false;
playground.CodeWidget.savedByTheGoogAPIKey = "AIzaSyA5m1Nc8ws2BbmPRwKu5gFradvD_hgq6G0";

playground.CodeWidget.codeMirrorScriptCb_ = function(e) {
  if (window.navigator.userAgent.indexOf('MSIE') != -1) { 
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      playground.CodeWidget.codeMirrorScriptLoaded = true;
      var waiting = playground.CodeWidget.widgetsWaitingToLoad_;
      for (var i = 0; i < waiting.length; i++) {
        waiting[i].loadCode_();
      }
    }
  } else {
    playground.CodeWidget.codeMirrorScriptLoaded = true;
    var waiting = playground.CodeWidget.widgetsWaitingToLoad_;
    for (var i = 0; i < waiting.length; i++) {
      waiting[i].loadCode_();
    }
  }
}

playground.CodeWidget.prototype.applyStartLine_ = function(data) {
  if (this.options_.startLine && this.options_.startLine > 1) {
    var curLineNum = 1;
    var lastIndex = 0;
    while (curLineNum != this.options_.startLine) {
      if (curLineNum != 1) {
        lastIndex += 1;
      }
      lastIndex = data.indexOf('\n', lastIndex);
      if (lastIndex == -1) {
        throw playground.CodeWidget.errorPrefix + 'bad startLine.';
      }
      curLineNum++;
    }
    return data.substring(lastIndex + 1);
  }
  return data;
}

playground.CodeWidget.prototype.applyEndLine_ = function(data) {
  if (this.options_.numLines) {
    var curLineNum = 0;
    var lastIndex = 0;
    while (curLineNum != this.options_.numLines) {
      if (curLineNum != 0) {
        lastIndex += 1;
      }
      lastIndex = data.indexOf('\n', lastIndex);
      if (lastIndex == -1) {
        lastIndex = data.length - 1;
        break;
      }
      curLineNum++;
    }
    return data.substring(0, lastIndex + 1);
  }
  return data;
}

playground.CodeWidget.findNumSpacesToIndentCode_ = function(html) {
  var tryString = playground.CodeWidget.insertJavascriptRegex.exec(html)[0];
  var i = '';
  while(tryString.indexOf(' ') == 0) {
    i += ' ';
    tryString = tryString.substring(1);
  }

  return i;
};

playground.CodeWidget.indentCodeWithTheseSpaces =
    function(code, indentSpaces) {
  code = indentSpaces.concat(code);
  var newLine = code.indexOf('\n');
  while (newLine != -1) {
    var start = code.slice(0, newLine);
    var end = code.slice(newLine+1);
    end = ('\n' + indentSpaces).concat(end);
    code = start.concat(end);
    newLine = code.indexOf('\n', newLine + 1);
  }

  return code;
};


playground.CodeWidget.prototype.codeLoaded_ = function(codeObj) {
  this.js_ = codeObj.js;
  this.html_ = codeObj.html;
  var codeWidget = playground.CodeWidget;
  // Cache JSON responses.
  if (!codeWidget.widgetsWaitingToLoad_[codeObj.samplename]) {
    codeWidget.widgetsWaitingToLoad_[codeObj.samplename] = codeObj;
  }
  var indentSpaces = codeWidget.findNumSpacesToIndentCode_(this.html_);
  var indentedJs = codeWidget.indentCodeWithTheseSpaces(this.js_,
                                                        indentSpaces);
  this.allCode_ = codeObj.html.replace(codeWidget.insertJavascriptRegex,
                                       indentedJs);
  var data = this.allCode_;
  this.originalCode_ = data;
  data = this.applyStartLine_(data);
  data = this.applyEndLine_(data);
  this.shownCode_ = data;
  this.loadEditor_(data);
};

playground.CodeWidget.RawCompletion_ = function(obj) {
  if (obj.context) {
    playground.CodeWidget.contextToInstance[obj.context].codeLoaded_(obj);
  }
}

playground.CodeWidget.prototype.loadCode_ = function() {
  var samplename = this.options_.samplename;
  if (playground.CodeWidget.widgetsWaitingToLoad_[samplename]) {
    var obj = playground.CodeWidget.widgetsWaitingToLoad_[samplename];
    this.codeLoaded_(obj);
  } else {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    var context = playground.CodeWidget.contextToInstance.length;
    playground.CodeWidget.contextToInstance.push(this);
    var args = [
      'samplename=' + samplename,
      'cb=playground.CodeWidget.RawCompletion_',
      'context=' + context
    ];
    script.src = this.host_ + '/apis/ajax/playground/jsonpSamples?' +
        args.join('&');
    document.body.appendChild(script);
  }
};

playground.CodeWidget.prototype.autoSetCodeMirrorHeight_ = function() {
  var frame = this.options_.container.getElementsByTagName('iframe')[0];
  var height = (frame.contentWindow.document.body.offsetHeight) + 'px';
  frame.style.height = height;
  this.options_.container.style.height = height;
};

playground.CodeWidget.prototype.loadEditor_ = function(data) {
  var self = this;
  var height;
  if (this.options_.editorHeight == 'auto') {
    height = '0px';
  } else {
    height = this.options_.editorHeight ||
      playground.CodeWidget.defaultHeight_
  }
  this.editor_ = new CodeMirror(this.options_.container, {
    parserfile: ["prod_mixed_5ca7530f0218ca2f6b1bfc8ffc1bbbf0.js"],
    stylesheet: ["codemirror/css/xmlcolors.css", "codemirror/css/jscolors.css", "codemirror/css/csscolors.css"],
    autoMatchParens : true,
    path : 'codemirror/js/',
    height : height,
    content: data,
    textWrapping: false,
    lineNumbers: true,
    breakPoints: false,
    onLoad: function(self) {
      return function() {
        self.createButtons_();
        if (self.options_.editorHeight == 'auto') {
          self.autoSetCodeMirrorHeight_();
        }
      }
    }(self)
  });
};

playground.CodeWidget.prototype.showAllCode_ = function() {
  var self = this;
  return function() {
    // this refers to the button.
    this.parentNode.removeChild(this);
    self.shownCode_ = self.allCode_.replace(self.shownCode_, self.editor_.getCode());
    try {
      self.editor_.setCode(self.shownCode_);
    } catch(e) {
    }
  }
}

playground.CodeWidget.prototype.createRunIframe_ = function(token) {
  var url = 'http://savedbythegoog.appspot.com/retrieve_cache?unique_id=' + token;
  var runFrame = document.createElement('iframe');
  runFrame.src = url;
  runFrame.width = '100%';
  runFrame.height = this.options_.runFrameHeight;
  if (this.runFrame_) {
    this.options_.container.removeChild(this.runFrame_);
  }
  this.options_.container.appendChild(runFrame);
  this.runFrame_ = runFrame;
};


playground.CodeWidget.prototype.runCode_ = function() {
  var self = this;
  return function() {
    var code = self.editor_.getCode();
    code = self.originalCode_.replace(self.shownCode_, code);
    code = code.replace('{{ key }}', playground.CodeWidget.savedByTheGoogAPIKey);
    var cacheCodeLoc = '//code.google.com/apis/ajax/playground/cacheCode';
  	playground.CodeWidget.downloadUrl(cacheCodeLoc, function(self) {
  	  return function(responseText, status) {
  	    var token = responseText;
        self.createRunIframe_(token);
  	  }
  	}(self), 'code=' + encodeURIComponent(code), true);
  };
};

playground.CodeWidget.prototype.createButtons_ = function() {
  if (this.buttonsCreated_) return;
  this.buttonContainer_ = document.createElement('div');
  this.buttonContainer_.className = 'cw-button-container';
  if (this.options_.startLine || this.options_.numLines) {
    var viewAll = document.createElement('a');
    viewAll.innerHTML = 'all code';
    viewAll.href = '#';
    viewAll.onclick = this.showAllCode_();
    viewAll.className = 'cw-view-all';
    this.buttonContainer_.appendChild(viewAll);
  }
  var runCode = document.createElement('a');
  runCode.innerHTML = 'run code';
  runCode.href = '#';
  runCode.className = 'cw-run-code';
  runCode.style.marginLeft = '5px';
  runCode.onclick = this.runCode_();
  this.buttonContainer_.appendChild(runCode);
  this.buttonsCreated_ = true;
  this.options_.container.appendChild(this.buttonContainer_);
};

playground.CodeWidget.prototype.buttonsCreated_;

playground.CodeWidget.isCodeMirrorScriptLoaded_ = function() {
  return playground.CodeWidget.codeMirrorScriptLoaded;
};

playground.CodeWidget.createXmlHttpRequest = function() {
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

playground.CodeWidget.downloadUrl = function(url, callback, opt_data, opt_post) {
  var status = -1;
  var request = playground.CodeWidget.createXmlHttpRequest();
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

  if (opt_post) {
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  } else {
    request.open('GET', url, true);
  }
  try {
    var data = opt_data || null;
    request.send(data);
  } catch (e) {
    changeStatus(e);
  }
};
