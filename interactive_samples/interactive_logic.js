// For browserFun
// TODO:
// Make it so that you can make the code editing window wider...
// Make it so that you can click links to the documentation of each object
// Add Ping Pong
// Fix the spacing in the editor (when u hit tab)
// Try to see if for the javascript part you can eval line by line so that you can output the line number

var fileTypes = {
  'js' : 'javascript', 
  'html' : 'html',
  'php' : 'php'
};

function InteractiveSample(){
  this.categories = [];
  this.codeTitles = [];
  this.adjustCodeBoxAmount = 50;
  this.selectCode;
  this.codeDiv;
  this.codeLIs = [];
  this.currentCode = new Object();
  this.curI = '';
	this.cleanWindowObj;
	
  // Assume we're offline until we know that file reading doesn't work
	this.online = false;
};

function sortByCategory(a, b) {
  return a.category > b.category;
}

function sortByName(a, b) {
  return a.sampleName > b.sampleName;
}

function nameToHashName(name) {
  var hashName = name.toLowerCase();
  hashName = hashName.replace(/ /g, '_');
  return hashName;
}

InteractiveSample.prototype.init = function(codeDiv) {
  this.codeDiv = codeDiv;
  this.createCategories();
  this.addShowHideClicks();
  
    // TODO: Sort samples
    // codeArray.sort(sortByCategory);
    // 
    // for (var i=0; i < codeArray.length; i++) {
    //   codeArray[i].samples.sort(sortByName);
    // }
  
  
    // This is so that we can restore the first level of the window object
    // after we run a sample... so samples can get run a lot and not clutter
    // the window object.
  this.cleanWindowObj = singleLevelKeyCopy(window);
};

InteractiveSample.prototype.createCategories = function() {
  // codeArray is from interactive_samples.js
  this.selectCode = _gel('selectCode');
  
  for (var i=0; i < codeArray.length; i++) {
    var container = _cel('span');
    container.className = 'category';
    
    var catName = _cel('span');
    
    var img = _cel('img');
    img.className = 'collapse';
    img.src = 'images/cleardot.gif';
    // addEvent(img, 'click', this.toggleExpand(img), false);
    
    catName.appendChild(img);
    catName.innerHTML += codeArray[i].category;
    
    container.appendChild(catName);
    
    var ul = _cel('ul');
    ul.className = 'categoryItems';
    
    container.appendChild(ul);
    
    for (var j=0; j < codeArray[i].samples.length; j++) {
      var item = codeArray[i].samples[j];
      var li = _cel('li');
      
      li.innerHTML = item.sampleName;
      
      this.codeTitles.push(li);
      var files = codeArray[i].samples[j].files;
      addEvent(li, 'click', this.showSample(this, files, li));
      
      if (i == 0 && j == 0) {
        this.showSample(this, files, li, true)();
      }
      
      if (window.location.hash.length > 0) {
        var hashName = nameToHashName(item.sampleName);
        if (window.location.hash.substring(1) == hashName) {
          this.showSample(this, files, li)();
        }
      }
      
      this.codeLIs.push(li);
      ul.appendChild(li);
    }
    
    this.selectCode.appendChild(container);
    this.categories.push(container);
  }  
};

InteractiveSample.prototype.toggleShowHide = function(category, interactiveSample) {
  return function() {
    var li = category.nextSibling;
    var el = category.childNodes[0];
    if (el.className == 'expand') 
      el.className = 'collapse';
    else
      el.className = 'expand';
    
    if (li.style.display == 'none') {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  };
};

InteractiveSample.prototype.addShowHideClicks = function() {
  for (var i=0; i < this.categories.length; i++) {
    categoryName = this.categories[i].childNodes[0];
    addEvent(categoryName, 'click', this.toggleShowHide(categoryName, this));
  }
};

InteractiveSample.prototype.loadLocally = function(relativeUrl, filename, fileType, opt_changeCodeMirror) {
  // readFile is in utils.js
  var data = readFile(relativeUrl);    
  if (data == null) {
    this.online = true;
    return false;
  }
  if (opt_changeCodeMirror == true) {
    this.changeCodeMirror(data, fileType);
  }
  is_instance.currentCode[filename] = {
    code : data
  };  
  console.log(relativeUrl + ': loaded locally.');
  
  return true;
}

InteractiveSample.prototype.loadRemotely = function(relativeUrl, filename, fileType, opt_changeCodeMirror) {
  is_instance = this;
  downloadUrl(relativeUrl, function(data, status) {
    if (opt_changeCodeMirror == true) {
      is_instance.changeCodeMirror(data, fileType);
    }
    is_instance.currentCode[filename] = {
      code : data
    };
  });
}

InteractiveSample.prototype.loadCode = function(filename, opt_changeCodeMirror) {
  // If the code is in the currentCode buffer, then grab it there
  // otherwise, load it via XHR
  // If opt_changeCodeMirror is specified, load it into the window
  
  // Get filetype
  var filenameSplit = filename.split('.');
  var extension = filenameSplit[filenameSplit.length - 1];
  var fileType = fileTypes[extension.toLowerCase()];
  var inBuffer = (this.currentCode[filename] && this.currentCode[filename].code) ? true : false;
  if (inBuffer && opt_changeCodeMirror == true) {
    this.changeCodeMirror(this.currentCode[filename].code, fileType);
  } else {
    var relativeUrl = 'samples/' + filename;
    
    is_instance = this;
    
    if (!this.online) {
      this.loadLocally(relativeUrl, filename, fileType, opt_changeCodeMirror);
    } 
    
    if (this.online) {
      this.loadRemotely(relativeUrl, filename, fileType, opt_changeCodeMirror);
    }
  }
};

// TODO: can is_instance just be set as is_instance = this above return function()
InteractiveSample.prototype.showSample = function(is_instance, files, thisLI, def) {
  return function() {
    var codeDiv = is_instance.codeDiv;
    var codeLIs = is_instance.codeLIs;
    for (var i=0; i < codeLIs.length; i++) {
      codeLIs[i].className = '';
    }
    
    // For linking purposes
    if (!def) {
      window.location.hash = nameToHashName(thisLI.innerHTML);
    }
    
    // Make code selected designate this as selected
    thisLI.className = 'selected';
    
    is_instance.currentCode = new Object();
    
    
    // add file names at top
    var tab_bar = _gel('tab_bar');
    tab_bar.innerHTML = '';
    
    // prototype syntax
    files.each(function (file, index) {
      
      var tabClass = 'lb';
      if (index == 0) {
        tabClass = 'db';
        is_instance.loadCode(file, true);
      } else {
        is_instance.loadCode(file, false);
      }
        
      
      var containerDiv = _cel('div');
      containerDiv.className = 'roundedcornr_box';
      addEvent(containerDiv, 'click', is_instance.changeTab(file, is_instance));
      
      var html = '<div class="' + tabClass + '_top" ><div></div></div>';
      html += '<div class="' + tabClass + '_roundedcornr_content" >';
      html += file;
      html += '</div>';
      
      containerDiv.innerHTML = html;
      
      tab_bar.appendChild(containerDiv);
    });
    
    // is_instance.loadCode(files[0], textArea);
    is_instance.curI = files[0];
  };
};

InteractiveSample.prototype.changeTab = function(i, is_instance) {
  return function() {
    var siblings = this.parentNode.childNodes;
    is_instance.currentCode[is_instance.curI].code = is_instance.getCode();
    
    // Swap the colors of the tabs
    for (var z=0; z < siblings.length; z++) {
      if (siblings[z].childNodes[1].innerHTML == i) {
        siblings[z].childNodes[0].className = 'db_top';
        siblings[z].childNodes[1].className = 'db_roundedcornr_content';
      } else {
        siblings[z].childNodes[0].className = 'lb_top';
        siblings[z].childNodes[1].className = 'lb_roundedcornr_content';
      }
    }
    
    is_instance.loadCode(i, true);    
    is_instance.curI = i;
  };
};

InteractiveSample.prototype.increaseCodeBoxHeight = function() {
  var curHeight = this.textArea.style.height;
  curHeight = curHeight.substr(0, curHeight.indexOf('px'));
  var newHeight = parseInt(curHeight) + this.adjustCodeBoxAmount;
  newHeight += 'px';
  this.textArea.style.height = newHeight;
};

InteractiveSample.prototype.decreaseCodeBoxHeight = function() {
  var curHeight = this.textArea.style.height;
  curHeight = curHeight.substr(0, curHeight.indexOf('px'));
  var newHeight = parseInt(curHeight) - this.adjustCodeBoxAmount;
  newHeight += 'px';
  this.textArea.style.height = newHeight;
};

InteractiveSample.prototype.prepareAllCodeRun = function() {
  // TODO: Change this so it doesn't rely on the first file being HTML
  // TODO: Change this to use REGEX to replace
	this.deleteOldWindowStuff();
	
  this.currentCode[this.curI].code = this.getCode();
  
  var html = '';
  for (var i in this.currentCode) {
    if (i.indexOf('.html') != -1)
      html = this.currentCode[i].code;
  }
  var nextStart = 0;
  var replacing = true;
  
  while(replacing) {
    var scriptLoc = html.indexOf('<script src="', nextStart);
    if (scriptLoc != -1) {
      nextStart = scriptLoc;
      var scriptSrc = scriptLoc + 13;
      var scriptSrcEnd = html.indexOf('"', scriptSrc);
      var script = html.substring(scriptSrc, scriptSrcEnd);
      var endScriptLoc = html.indexOf('</script>', scriptLoc) + 9;
      var found = false;
      for (var z in this.currentCode) {
        if (z == script) {
          found = true;
          script = '<script type="text/javascript" charset="utf-8">'+this.currentCode[z].code+'</script>';
        }
      }
      
      // for (var z=0; z < this.currentCode.length; z++) {
      //   if (this.currentCode[z].fileName == script) {
      //     found = true;
      //     script = '<script type="text/javascript" charset="utf-8">'+this.currentCode[z].code+'</script>';
      //   }
      // }
      if (found)
        html = html.substring(0, scriptLoc) + script + html.substring(endScriptLoc);      
    } else {
      replacing = false;
    }
  }
  
  // console.log(html);
  window.codeToRun = html;
  
  // console.log(html.slice(scriptLoc, endScriptLoc));
  // console.log(html);
};

InteractiveSample.prototype.runJS = function() {
  // TODO don't assume that we run javascript in any order.  Make it so that 
  // it checks the HTML for which order JS goes in
  var hash = window.location.hash;
  window.is.startJS();  
};

InteractiveSample.prototype.deleteOldWindowStuff = function() {
	for (var i in window) {
		if (typeof this.cleanWindowObj[i] == 'boolean' && this.cleanWindowObj[i] == true) {} else delete window[i];
	}
};

InteractiveSample.prototype.startJS = function() {
	this.deleteOldWindowStuff();
  this.currentCode[this.curI].code = this.getCode();
  
  for (var i in this.currentCode) {
  // for (var i=0; i < this.currentCode.length; i++) {
		if (i.indexOf('.html') != -1) {
			// Now add the HTML to the page
			_gel('HTMLforInlineJavascript').innerHTML = this.currentCode[i].code;
		}
    if (i.indexOf('.js') != -1) {
      window.eval(this.currentCode[i].code);
    }
  }
	try {
		window.onload();
	} catch(e) {
		alert(e.message);
	}
	
};

InteractiveSample.prototype.changeCodeMirror = function(content, lang) {
  if (lang == 'javascript') {
    window.jsEditor.setCode(content);
    window.jsEditor.frame.style.display = 'inline';
    window.htmlEditor.frame.style.display = 'none';
  } else if (lang == 'html') {
    window.htmlEditor.setCode(content);
    window.htmlEditor.frame.style.display = 'inline';
    window.jsEditor.frame.style.display = 'none';
  }
};

InteractiveSample.prototype.getCode = function() {
  if (window.htmlEditor.frame.style.display != 'none') {
    return window.htmlEditor.getCode();
  } else if (window.jsEditor.frame.style.display != 'none') {
    return window.jsEditor.getCode();
  }
};

// Todo have the window automatically size to the size of the window

InteractiveSample.prototype.increaseWidth = function() {
  var container = document.getElementById('container');
  var curWidth = container.style.maxWidth = '1800px';
};
