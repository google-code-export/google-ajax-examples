// Anonymous function, keep the global namespace squeeky clean..
(function() {

  if (typeof console == 'undefined') {
    var console = {
      log : function() {}
    };
  }

  var fileTypes = {
    'js' : 'javascript',
    'html' : 'html',
    'php' : 'php'
  };

  function _cel(name) {
    return document.createElement(name);
  }

  var savedByTheGoogAPIKey = "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q";

  function InteractiveSample(){
    this.categories = [];
    this.subCategories = [];
    this.codeTitles = [];
    this.selectCode = null;
    this.codeDiv = null;
    this.codeLIs = [];
    this.currentCode = new Object();
    this.curI = '';
    this.htmlEditor;

    this.uiEffects = new Object();
    this.runBox = new Object();
    this.autoCompleteData = [];
    this.tryCatchRegex;
  };

  InteractiveSample.prototype.nameToHashName = function(name) {
    var hashName = name.toLowerCase();
    hashName = hashName.replace(/ /g, '_');
    return hashName;
  };

  InteractiveSample.prototype.init = function(codeDiv) {
    this.ie6 = ($.browser.msie && $.browser.version < 7);
    this.runBox = new RunBox();
    this.runBox.init(this, !$.browser.msie);
    this.codeDiv = codeDiv;
    this.createCategories();
    this.addShowHideClicks();
    this.uiEffects = new UIEffects();
    this.uiEffects.init(this);
    if (window.logoutUrl) {
      this.putSafetyCookieInForms();
    }

    this.tryCatchRegex = /[ ]*try {if \(window\.parent && window\.parent\.is && window\.parent\.is\.codeToRun\) {eval\(window\.parent\.is\.codeToRun\);window\.onload = function\(\) {window\.document\.body\.onclick = function\(\) {window\.parent\.is\.uiEffects\.bringRunBoxToFront\(\);};};}} catch \(e\) {alert\("Error: " \+ e\.message\);}/;
  };

  InteractiveSample.prototype.getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  InteractiveSample.prototype.getSafetyToken = function() {
    var cookie = this.getCookie('dev_appserver_login');
    cookie = (cookie) ? cookie.replace(/\"/g, '') : this.getCookie('ACSID');
    cookie = (cookie) ? cookie.substring(6, 20) : null;
    return 'safe' + cookie;
  }

  InteractiveSample.prototype.putSafetyCookieInForms = function() {
    var safetyToken = this.getSafetyToken();
    if (safetyToken) {
      $('#safetyCookie').attr('value', safetyToken);
    }
  };

  InteractiveSample.prototype.deleteCustomExample = function(id) {
    var me = this;
    return function() {
      var confirmDelete = confirm('Are you sure you want to delete this example?');
      if (confirmDelete) {
        var redirect = 'delete?id=' + id;
        var cookie = me.getCookie('dev_appserver_login');
        cookie = (cookie) ? cookie.replace(/\"/g, '') : me.getCookie('ACSID');
        cookie = (cookie) ? cookie.substring(6, 20) : null;
        redirect += ((curAPITypes) ? '&type=' + curAPITypes : '');
        redirect += (cookie) ? '&sc=' + 'safe' + cookie : '';
        window.location = redirect;
      }
    };
  };

  InteractiveSample.prototype.addDeleteIcon = function(li, id) {
//    var imgTD = _cel('td');
    var deleteCodeImg = _cel('img');
    deleteCodeImg.src = 'images/trash.gif';
    deleteCodeImg.style.cursor = 'pointer';
    deleteCodeImg.style.marginLeft = '6px';
    $(deleteCodeImg).bind('click', this.deleteCustomExample(id));

    li.appendChild(deleteCodeImg);
  };

  InteractiveSample.prototype.createCategories = function() {
    // codeArray is from ajax_apis_samples.js
    this.selectCode = $('#selectCode').get(0);
    for (var i=0; i < codeArray.length; i++) {
      var category = codeArray[i].category;
      var container = null;
      var subCategory = null;
      var categoryDiv = null;
      var subCategoryDiv = null;
      var img, link;
      if (category.indexOf('-') != -1) {
        // that means that this category is a subcategorys
        var categorySplit = category.split('-');
        category = categorySplit[0];
        subCategory = categorySplit[1];
      }
      categoryDiv = document.getElementById(category);
      if (categoryDiv == null) {
        categoryDiv = _cel('span');
        categoryDiv.className = 'category categoryClosed';
        categoryDiv.id = category;
        var catName = _cel('span');
        catName.className = 'categoryTitle';
        img = _cel('img');
        img.className = 'expand';
        img.src = 'images/cleardot.png';

        catName.appendChild(img);
        catName.innerHTML += category;
        if (codeArray[i].docsUrl) {
//          link = this.createDocsLink(codeArray[i].docsUrl);
//          catName.appendChild(link);
        }
        categoryDiv.appendChild(catName);
        this.selectCode.appendChild(categoryDiv);

        this.categories.push(categoryDiv);
      }

      if (subCategory) {
        subCategoryDiv = document.createElement('div');
        var subCatName = _cel('span');
        subCatName.className = 'subCategoryTitle';

        img = _cel('img');
        img.className = 'collapse';
        img.src = 'images/cleardot.png';

        subCatName.appendChild(img);
        subCatName.innerHTML += subCategory;

        subCategoryDiv.appendChild(subCatName);

        if (codeArray[i].docsUrl) {
//          link = this.createDocsLink(codeArray[i].docsUrl);
//          subCategoryDiv.appendChild(link);
        }

        categoryDiv.appendChild(subCategoryDiv);
      }

      container = subCategoryDiv || categoryDiv;

      var ul = _cel('ul');
      ul.className = 'categoryItems';

      container.appendChild(ul);

      for (var j=0; j < codeArray[i].samples.length; j++) {
        var item = codeArray[i].samples[j];
        var li = _cel('li');
        var textNode = document.createElement('span');
        textNode.innerHTML = item.sampleName;
        textNode.style.cursor = 'pointer';
        $(textNode).bind('click', this.showSample(item.sampleName));
        li.appendChild(textNode);
        if (item.docsUrl) {
//          li.appendChild(this.createDocsLink(item.docsUrl));
        }
        if (category == 'Saved Code') {
          this.addDeleteIcon(li, codeArray[i].samples[j].id);
        }
        var tags = ' <sup>(' + ((category) || '') + ((subCategory) ? ', ' + subCategory : '');
        tags += (item.tags) ? ', ' + item.tags : '';
        tags += ')<\/sup>';
        this.autoCompleteData.push(item.sampleName + tags);
        codeArray[i].samples[j]['li'] = li;

        if (i == 0 && j == 0 && window.location.hash.length <= 1) {
          this.showSample(item.sampleName, true)();
          this.hideAllCategoriesExcept(categoryDiv);
        }

        if (window.location.hash.length > 0) {
          var hashName = this.nameToHashName(item.sampleName);
          if (window.location.hash.substring(1) == hashName) {
            this.showSample(item.sampleName)();
            this.hideAllCategoriesExcept(categoryDiv);
          }
        }

        if (window.expandedCategory && category.toLowerCase().indexOf(window.expandedCategory) != -1 && window.location.hash.length <= 1) {
          this.hideAllCategoriesExcept(categoryDiv);
          if (j == 0) {
            this.showSample(item.sampleName)();
          }
        }

        this.codeLIs.push(li);
        ul.appendChild(li);
      }

      if (container != categoryDiv) {
        this.subCategories.push(container);
      }
    }
  };

  InteractiveSample.prototype.createDocsLink = function(docUrl) {
    if (docUrl) {
      var img = _cel('img');
      img.src = 'images/docs.png';
      img.className = 'docsImg';
      img.border = 0;

      var link = _cel('a');
      link.href = docUrl;
      link.target = "_blank";
      link.className = "docsLink";
      link.appendChild(img);
      link.style.display = 'inline';

      return link;
    }
  };

  InteractiveSample.prototype.toggleShowHideLIs = function(category) {
    return function() {
      var ul = category.nextSibling;
      // if the sibling is an anchor, that means it's the docsLink anchor, so grab the one after.
      if (ul.nodeName.toLowerCase() == 'a') ul = ul.nextSibling;
      var el = category.childNodes[0];
      if (el.className == 'expand')
        el.className = 'collapse';
      else
        el.className = 'expand';

      if (ul.style.display == 'none') {
        ul.style.display = 'block';
      } else {
        ul.style.display = 'none';
      }
    };
  };

  InteractiveSample.prototype.toggleShowHideSubCategories = function(category) {
    return function() {
      // Change the collapse img to a + or a -
      var collapseImg = category.childNodes[0].childNodes[0];
      if (collapseImg.className == 'expand') {
        collapseImg.className = 'collapse';
        category.className = 'category categoryOpen';
      } else {
        collapseImg.className = 'expand';
        category.className = 'category categoryClosed';
      }
    };
  };

  InteractiveSample.prototype.hideAllCategoriesExcept = function(category) {
    for (var i=0; i < this.categories.length; i++) {
      var curCategory = this.categories[i];
      var collapseImg = curCategory.childNodes[0].childNodes[0];
      if (curCategory != category) {
        curCategory.className = 'category categoryClosed';
        collapseImg.className = 'expand';
      } else {
        curCategory.className = 'category categoryOpen';
        collapseImg.className = 'collapse';
      }
    };
  };

  InteractiveSample.prototype.addShowHideClicks = function() {
    var i;
    for (i = 0; i < this.categories.length; i++) {
      var cat = this.categories[i];
      var catTitle = cat.childNodes[0];
      $(catTitle).bind('click', this.toggleShowHideSubCategories(cat));
    }

    for (i = 0; i < this.subCategories.length; i++) {
      var subCatTitle = this.subCategories[i].childNodes[0];
      $(subCatTitle).bind('click', this.toggleShowHideLIs(subCatTitle));
    };
  };

  InteractiveSample.prototype.loadRemotely = function(filename, fileType, opt_changeCodeMirror) {
    var me = this;
    if (filename.indexOf('?id=') != -1) {
      filename += '&sc=' + this.getSafetyToken();
    }
    $.get(filename, function(data) {
      if (opt_changeCodeMirror) {
        me.changeCodeMirror(data);
      }
      me.currentCode[filename] = {
        code : data
      };
    });
  };

  InteractiveSample.prototype.loadCode = function(filename, opt_changeCodeMirror) {
    // If the code is in the currentCode buffer, then grab it there
    // otherwise, load it via XHR
    // If opt_changeCodeMirror is specified, load it into the window
    // Get filetype
    var filenameSplit = filename.split('.');
    var extension = filenameSplit[filenameSplit.length - 1];
    var fileType = fileTypes[extension.toLowerCase()];
    var inBuffer = (this.currentCode[filename] && this.currentCode[filename].code);
    if (inBuffer && opt_changeCodeMirror) {
      this.changeCodeMirror(this.currentCode[filename].code);
    } else {
      this.loadRemotely(filename, fileType, opt_changeCodeMirror);
    }
  };

  InteractiveSample.prototype.sampleNameToObject = function(sampleName) {
    for (var i=0; i < codeArray.length; i++) {
      for (var j=0; j < codeArray[i].samples.length; j++) {
        var sampleObj = codeArray[i].samples[j];
        if (sampleObj.sampleName == sampleName) {
          sampleObj['category'] = codeArray[i].category;
          sampleObj['categoryDocsUrl'] = codeArray[i].docsUrl || null;
          return sampleObj;
        }
      }
    }
  };

  InteractiveSample.prototype.sampleFileNameToObject = function(sampleFileName) {
    for (var i=0; i < codeArray.length; i++) {
      for (var j=0; j < codeArray[i].samples.length; j++) {
        var sampleObj = codeArray[i].samples[j];
        for (var k=0; k < sampleObj.files.length; k++) {
          var file = sampleObj.files[k];
          if (sampleFileName == file) {
            sampleObj['category'] = codeArray[i].category;
            sampleObj['categoryDocsUrl'] = codeArray[i].docsUrl || null;
            return sampleObj;
          }
        }
      }
    }
  };

  InteractiveSample.prototype.showSample = function(sampleName, def) {
    me = this;
    return function() {
      var sampleObj = me.sampleNameToObject(sampleName);
      var files = sampleObj.files;
      var thisLI = sampleObj.li;
      var catSplit = sampleObj.category.split('-');
      var categoryName = catSplit[0];

      var codeLIs = me.codeLIs;
      me.setDemoTitle(sampleObj);
      var i;
      for (i = 0; i < codeLIs.length; i++) {
        codeLIs[i].className = '';
      }

      // For linking purposes
      if (!def) {
        window.location.hash = me.nameToHashName(sampleName);
      }

      // Make code selected designate this as selected
      thisLI.className = 'selected';

      me.currentCode = new Object();


      // add file names at top
      // var tab_bar = $('#tab_bar');
      // tab_bar.innerHTML = '';
      for (i = 0; i < files.length; i++) {
        var file = files[i];

        var tabClass = 'lb';
        if (i == 0) {
          tabClass = 'db';
          me.loadCode(file, true);
        } else {
          me.loadCode(file, false);
        }


        // var containerDiv = _cel('div');
        // containerDiv.className = 'roundedcornr_box';
        // $(containerDiv).bind('click', me.changeTab(file));
        // 
        // var html = '<div class="' + tabClass + '_top" ><div><\/div><\/div>';
        // html += '<div class="' + tabClass + '_roundedcornr_content" >';
        // html += file;
        // html += '<\/div>';
        // 
        // containerDiv.innerHTML = html;

      // tab_bar.appendChild(containerDiv);
      }

    // me.loadCode(files[0], textArea);
      me.hideAllCategoriesExcept(document.getElementById(categoryName));
      me.curI = files[0];
      
      try {
        if (window.pageTracker) {
          window.pageTracker._trackPageview();
        }
      } catch(e) {}
    };
  };

  InteractiveSample.prototype.changeTab = function(i) {
    var me = this;
    return function() {
      var siblings = this.parentNode.childNodes;
      me.currentCode[me.curI].code = me.getCode();

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

      me.loadCode(i, true);
      me.curI = i;
    };
  };

  InteractiveSample.prototype.runCode = function() {
    try {
      if (typeof this.currentCode[this.curI] == 'undefined') {
        this.currentCode[this.curI] = new Object();
      }
      this.codeToRun = this.currentCode[this.curI].code = this.getCode();
      this.runBox.runCode();
    } catch (e) {
      // this will fail sometimes and that's OK.  It just means that CodeMirror
      // doesn't have the code loaded that we are trying to use.
    }
  };

  InteractiveSample.prototype.changeCodeMirror = function(content) {
    try {
      window.jsEditor.setCode(content);
    } catch (e) {
      alert('fail!');
    }
  };

  InteractiveSample.prototype.getCode = function() {
    return window.jsEditor.getCode();
  };

  InteractiveSample.prototype.getCurFilename = function() {
    return this.curI;
  };

  InteractiveSample.prototype.replaceTryCatchCode = function(data, code) {
    data = data.replace(this.tryCatchRegex, code);
    return data;
  };

  InteractiveSample.prototype.findNumSpacesToIndentCode = function(data) {
    var tryString = this.tryCatchRegex.exec(data)[0];
    var i = '';
    while(tryString.indexOf(' ') == 0) {
      i += ' ';
      tryString = tryString.substring(1);
    }

    return i;
  };

  InteractiveSample.prototype.indentCodeWithTheseSpaces = function(code, indentSpaces) {
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

  InteractiveSample.prototype.getFullSrc = function(callbackFunc, opt_APIKey) {
    var curFilename = this.getCurFilename();
    var sampleObj = this.sampleFileNameToObject(curFilename);
    var url = sampleObj.boilerplateLoc;
    var me = this;

    $.get(url, function(data, success) {
      if (success) {
        var code = me.getCode();
        var indentSpaces = me.findNumSpacesToIndentCode(data);

        code = me.indentCodeWithTheseSpaces(code, indentSpaces);

        data = me.replaceTryCatchCode(data, code);

        var key = opt_APIKey || "<<INSERT KEY>>";
        data = data.replace(/key=.*"/, "key=" + key + "\"");
        callbackFunc(data);
      }
    });
  };

  InteractiveSample.prototype.outputSource = function() {
    this.getFullSrc(this.uiEffects.showSource);
  };

  InteractiveSample.prototype.setDemoTitle = function(sampleObj) {
    var sampleName = sampleObj.sampleName;
    var catSplit = sampleObj.category.split('-');
    var title = $('<div>' + (catSplit[1] ? catSplit[1] : catSplit[0]) + ' > ' + sampleName + '</div>');
    if (sampleObj.docsUrl || sampleObj.categoryDocsUrl) {
      var docLink = $('<sup class="supDocs">&nbsp;<a href="' +
                      (sampleObj.docsUrl || sampleObj.categoryDocsUrl) +
                      '" target="_blank">docs</a></sup>');
      title.append(docLink);
    }

    $('#demoTitle').html(title);
    $('#saveSampleName').attr('value', 'Custom ' + sampleName);
    $('#tagsSaveForm').attr('value', sampleObj.tags);
  };

  InteractiveSample.prototype.sendCodeToServer = function(code) {
    code = code.replace(/\n/g, 'NEWLINE!!!');
    $('#codeHolder').attr('value', code);
    $('#linkCodeForm').get(0).submit();
  };

  InteractiveSample.prototype.linkCode = function() {
    var apiKey = savedByTheGoogAPIKey;
    this.getFullSrc(this.sendCodeToServer, apiKey);
  };

  InteractiveSample.prototype.saveCode = function() {
    var curFilename = this.getCurFilename();
    var sampleObj = this.sampleFileNameToObject(curFilename);
    if (sampleObj.category == 'Saved Code') {
      var confirmOverwrite = confirm('Are you sure you want to overwrite this code?');
      if (confirmOverwrite) {

        // HUGE HACK.  In IE, an input element can't store a newline character,
        // or at least I can't find out how.  So they all get lost during the send
        // so on the server side i will parse out NEWLINE!!! and add in the correct
        // code :)
        var code = this.getCode();
        code = code.replace(/\n/g, 'NEWLINE!!!');
        $('#jscodeSaveForm').attr('value', code);
        // $('#saveSampleName').attr('value', sampleObj.sampleName);
        $('#idSaveForm').attr('value', sampleObj.id);
        // $('#tagsSaveForm').attr('value', sampleObj.tags);
        $('#saveForm').submit();
      }
    } else {
     this.uiEffects.showSaveForm();
    }
  };

  InteractiveSample.prototype.confirmLogin = function(url, opt_mustLogin) {
    var confirmLeave;
    if (opt_mustLogin) {
      confirmLeave = confirm('You must login to save.  Logging in will lose any edited code.');
    } else {
      confirmLeave = confirm('Logging in will lose any edited code.');
    }
    url += "%23" + window.location.hash.substring(1);
    if (confirmLeave) window.location = url;
  };











  /*
   * UIEffects sets up all of the jQuery UI stuff for draggable etc.
  */
  function UIEffects() {
    this.is = new Object();
    this.mousePos = new Object();
    this.numHTMLEditors;
    this.uiEls;
    this.dropdownTimer;
    this.movedFlags;
  }

  UIEffects.prototype.init = function(is) {
    this.is = is;
    this.numHTMLEditors = 0;
    this.uiEls = {
      'editor': $('#editor'),
      'editShadowContainer': $('#editShadowContainer'),
      'selectContainer': $('#selectContainer'),
      'pickShadowContainer': $('#pickShadowContainer'),
      'outputDrag': $('outputDrag'),
      'outputDiv': $('#outputDiv'),
      'runShadowContainer': $('#runShadowContainer')
    };

    // so we can not resize the divs on a window resize if the user has them
    // moved on their own
    this.movedFlags = {
      'edit' : false,
      'output' : false
    };

    this.mousePos = {
      'x': 0,
      'y': 0
    };

    var me = this;
  // So that we can track the mouse movement
    $().mousemove(function(e){
      me.mousePos.x = e.pageX;
      me.mousePos.y = e.pageY;
    });
    // Resizable/draggable is broken in jquery UI for IE... it doesn't like
    // calculating correctly if you are scrolled down on the page at all..
    if (!$.browser.msie) {
      this.setResizables();
      this.setDraggables();
    }

    this.setAbsolutePosition('footerLinks');
    this.setAbsolutePosition('footerImg');
    this.setAbsolutePosition('outputDiv');
    this.setAbsolutePosition('editor');
    this.setAbsolutePosition('selectContainer');

    // Don't do shadows if we're in IE6... because it doesn't like transparency
    // in PNGs
    if (!this.is.ie6) {
      this.setDivShadow('outputDiv', 'runShadowContainer');
      var height = $("#editor").height();
      // one-off hack because firefox makes the editor div 2 pixels to tall
      if($.browser.mozilla) $("#editor").css('height', height - 2);
      this.setDivShadow('editor', 'editShadowContainer');
      this.setDivShadow('selectContainer', 'pickShadowContainer');

    } else {
      $('.bottomShadows').css('background', 'none');
      $('.rightShadows').css('background', 'none');
    }
    this.setWindowResize();
    this.initAutoComplete();

    if ($.browser.safari) $('.buttonText').css('padding-bottom', '5px');
    this.initShowSourceDiv();
    this.initSaveCodeDiv();
    this.setCodeMenuButtonClicks();
    this.setBringWindowFrontClicks();
  };

  UIEffects.prototype.setAbsolutePosition = function(divID) {
    var outputContainer = $("#" + divID);
    var width = $(outputContainer).width();
    var height = $(outputContainer).height();
    var pos = $(outputContainer).position();
    outputContainer.css('position', 'absolute')
            .css('width', width)
            .css('height', height)
            .css('top', pos.top + 'px')
            .css('left', pos.left + 'px');
  };

  UIEffects.prototype.setBringWindowFrontClicks = function() {
    var me = this;
    this.uiEls.editor.bind('click', function() {
      me.bringEditorToFront();
    });
    this.uiEls.outputDiv.bind('click', function() {
      me.bringRunBoxToFront();
    });
    this.uiEls.selectContainer.bind('click', function() {
      me.bringSelectToFront();
    });
  };

  UIEffects.prototype.decreaseZButRetainExistingHeirarchy = function(els, maxZ) {
    function sortByZs(a, b){
      var aZ = a.css('z-index');
      var bZ = b.css('z-index');
      if (aZ < bZ) {
        return -1;
      }
      if (aZ > bZ) {
        return 1;
      }
      return 0;
    }
    els = els.sort(sortByZs);
    var curZ = maxZ;
    for (var i = els.length - 1; i >= 0; i--) {
      els[i].css('z-index', curZ--);
    }
  };

  UIEffects.prototype.bringSelectToFront = function() {
    this.uiEls.selectContainer.css('z-index', '502');
    this.uiEls.pickShadowContainer.css('z-index', '501');
    var elsToChange = [
      this.uiEls.editor,
      this.uiEls.editShadowContainer,
      this.uiEls.outputDiv,
      this.uiEls.runShadowContainer
    ];
    this.decreaseZButRetainExistingHeirarchy(elsToChange, 500);
  };

  UIEffects.prototype.bringEditorToFront = function() {
    this.uiEls.editor.css('z-index', '502');
    this.uiEls.editShadowContainer.css('z-index', '501');
    var elsToChange = [
      this.uiEls.selectContainer,
      this.uiEls.pickShadowContainer,
      this.uiEls.outputDiv,
      this.uiEls.runShadowContainer
    ];
    this.decreaseZButRetainExistingHeirarchy(elsToChange, 500);
  };

  UIEffects.prototype.bringRunBoxToFront = function() {
    this.uiEls.outputDiv.css('z-index', '502');
    this.uiEls.runShadowContainer.css('z-index', '501');
    var elsToChange = [
      this.uiEls.selectContainer,
      this.uiEls.pickShadowContainer,
      this.uiEls.editor,
      this.uiEls.editShadowContainer
    ];
    this.decreaseZButRetainExistingHeirarchy(elsToChange, 500);
  };

  UIEffects.prototype.setCodeMenuButtonClicks = function() {
    var me = this;
    var codeMenuButtonContainer = $('#codeMenuButtonContainer');
    var codeMenuDropdown = $('#codeMenuDropdown');

    codeMenuButtonContainer.bind('mousedown', function() {
      me.toggleDropdown('codeMenuDropdown');
      return false;
    });

    codeMenuButtonContainer.bind('mouseout', function() {
      me.dropdownTimer = window.setTimeout("window.is.uiEffects.toggleDropdown('codeMenuDropdown', true);", 100);
    });

    codeMenuButtonContainer.bind('mouseover', function() {
      if (me.dropdownTimer) {
        window.clearTimeout(me.dropdownTimer);
      }
    });

    codeMenuDropdown.bind('mouseout', function() {
      me.dropdownTimer = window.setTimeout("window.is.uiEffects.toggleDropdown('codeMenuDropdown', true);", 100);
    });

    codeMenuDropdown.bind('mouseover', function() {
      if (me.dropdownTimer) {
        window.clearTimeout(me.dropdownTimer);
      }
    });
  };

  UIEffects.prototype.setDivShadow = function(divName, shadowDivName) {
    var outputContainer = $("#" + divName);
    var width = $(outputContainer).width();
    var height = $(outputContainer).height();
    var pos = $(outputContainer).position();

    this.setShadowDivSize(shadowDivName, width, height);
    this.setShadowDivPosition(shadowDivName, pos.top, pos.left);
    this.showShadowDiv(shadowDivName);
  };

  UIEffects.prototype.setWindowResize = function() {
    var me = this;
    $(window).bind('resize', function(e) {
      if (!me.movedFlags.edit) {
        me.resizeEdit();
      }
      if (!me.movedFlags.output) {
        me.resizeOutput();
      }
    });
  };

  UIEffects.prototype.resizeEdit = function() {
    var container = $('#container');
    var containerWidth = container.width();
    var containerLeft = container.position().left;
    var containerRight = containerWidth + containerLeft;
    var editor = this.uiEls.editor;
    var editorLeft = editor.position().left;
    var newWidth = containerRight - editorLeft - 4;
    if (newWidth > 100) {
      editor.css('width', newWidth + 'px');
      this.setDivShadow('editor', 'editShadowContainer');
    }
  };

  UIEffects.prototype.resizeOutput = function() {
    var containerWidth = $('#container').width();
    var newWidth = containerWidth - 6;
    if (newWidth > 100) {
      $('#outputDiv').css('width', newWidth + 'px');
      this.setDivShadow('outputDiv', 'runShadowContainer');
    }
  };

  UIEffects.prototype.setResizables = function() {
    var me = this;

    $("#outputDiv").resizable({
      handles: "se",
      helper: 'proxy',
      resize: function(e, ui) {
        me.updateDragSafeDiv();
        me.bringRunBoxToFront();
      },
      minHeight: 115,
      minWidth: 115,
      stop: function(e, ui) {
        me.hideDragSafeDiv();
        me.setDivShadow('outputDiv', 'runShadowContainer');
//        me.setShadowDivSize('runShadowContainer', ui.size.width, ui.size.height);
        me.is.runBox.setNewCodeRunIframeWidthHeight($('#runFrame'));
        me.movedFlags.output = true;
      }
    });

    $("#editor").resizable({
      handles: "se",
      helper: 'proxy',
      minHeight: 115,
      minWidth: 115,
      resize: function(e, ui) {
        me.updateDragSafeDiv();
        me.bringEditorToFront();
      },
      stop: function(e, ui) {
        me.hideDragSafeDiv();
        var editor = me.uiEls.editor;
        var editorHeight = editor.height();
        var newEditHeight = editorHeight - 46;
        $("#edit").css('height', newEditHeight + 'px');
        me.setDivShadow('editor', 'editShadowContainer');
        me.movedFlags.edit = true;
      }
    });


    $("#selectContainer").resizable({
      handles: "se",
      helper: 'proxy',
      minHeight: 115,
      minWidth: 115,
      resize: function(e, ui) {
        me.updateDragSafeDiv();
        me.bringSelectToFront();
      },
      stop: function(e, ui) {
        me.hideDragSafeDiv();
        var selectContainer = me.uiEls.selectContainer;
        var selectHeight = selectContainer.height();
        var newEditHeight = selectHeight - 46;
        $("#selectCode").css('height', newEditHeight + 'px');
        me.setDivShadow('selectContainer', 'pickShadowContainer');
      }
    });
  };

  UIEffects.prototype.setDraggables = function() {
    var me = this;
    $("#outputDiv").draggable({
      "handle": "h2",
      drag: function(e, ui) {
        me.updateDragSafeDiv();
        me.setShadowDivPosition('runShadowContainer', ui.position.top, ui.position.left);
        me.bringRunBoxToFront();
      },
      stop: function(e, ui) {
        me.hideDragSafeDiv();
        me.movedFlags.output = true;
      }
    });

    $("#editor").draggable({
      "handle": "h2",
      drag: function(e, ui) {
        me.updateDragSafeDiv();
        me.setShadowDivPosition('editShadowContainer', ui.position.top, ui.position.left);
        me.bringEditorToFront();
      },
      stop: function(e, ui) {
        me.hideDragSafeDiv();
        me.movedFlags.edit = true;
      }
    });

    $("#selectContainer").draggable({
      "handle": "h2",
      drag: function(e, ui) {
        me.updateDragSafeDiv();
        me.setShadowDivPosition('pickShadowContainer', ui.position.top, ui.position.left);
        me.bringSelectToFront();
      },
      stop: function(e, ui) {
        me.hideDragSafeDiv();
      }
    });
  };

  UIEffects.prototype.updateDragSafeDiv = function() {
    var newTop = this.mousePos.y - 300;
    var newLeft = this.mousePos.x - 300;
    $('#dragsafe').css('top', newTop + 'px').css('left', newLeft + 'px');
  };

  UIEffects.prototype.hideDragSafeDiv = function() {
    $('#dragsafe').css('top', '-600px').css('left', '-600px');
  };

  UIEffects.prototype.showShadowDiv = function(containerName) {
    $('#' + containerName).show();
  };

  UIEffects.prototype.setShadowDivPosition = function(containerName, top, left) {
    containerName = '#' + containerName;
    var shadowContainer = $(containerName);
    $(shadowContainer).css('top', top + 'px').css('left', left + 'px');
  };

  UIEffects.prototype.setShadowDivSize = function(containerName, newWidth, newHeight) {
    containerName = '#' + containerName;
    var shadowContainer = $(containerName);
    var oldWidth = $(shadowContainer).width();
    var oldHeight = $(shadowContainer).height();
    var changeWidth = newWidth - oldWidth;
    var changeHeight = newHeight - oldHeight;

  // Make bottom 1px shadow width change
    var bShadow = $(containerName + " div.bShadow")[0];
    var bShadowWidth = $(bShadow).width();
    var newBShadowWidth = bShadowWidth + changeWidth;
    $(bShadow).css('width', newBShadowWidth + 'px');

  // Make right 1px shadow height change
    var rShadow = $(containerName + " div.rShadow")[0];
    var rShadowHeight = $(rShadow).height();
    var newRShadowHeight = rShadowHeight + changeHeight;
    $(rShadow).css('height', newRShadowHeight + 'px');

    var bShadows = $(containerName + " .bottomShadows");
    var bShadowsCurTop = $(bShadows[0]).position().top;
    var newBShadowsTop = bShadowsCurTop + changeHeight;
    $(bShadows).css('top', newBShadowsTop + 'px');

    $(shadowContainer).css('width', newWidth + 'px').css('height', newHeight + 'px');
  };

  UIEffects.prototype.initShowSourceDiv = function() {
    $("#codeOutput0").dialog({
      modal: true,
      overlay: {
        opacity: 0.5,
        background: "black"
      },
      title: 'Source Code',
      height: 600,
      width: 800,
      resizable: false,
      autoOpen: false,
      draggable: false
    });
  };

  UIEffects.prototype.showSource = function(code) {
    // TODO: Be on the lookout for another fix for this bug:
    // .dialog('open') in jQuery clones whatever's in the div, erases it, then
    // remakes the div and inserts it.  Problem is, cloning the HTMLEditor iFrame
    // from CodeMirror doesn't work, because you can't clone an iFrame completely
    // Thus, what I do, is create a new CodeMirror everytime...  but CodeMirror
    // keeps track of all of the divs it has editors in by ID, so I have to
    // make it think it's inserting in a new Div.  Whew, this sucks.
    if (typeof this.htmlEditor == 'undefined') {
      $('#codeOutput0').dialog('open').show();
      this.htmlEditor = new CodeMirror(document.getElementById('codeOutput0'), {
        parserfile: ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js"],
        stylesheet: ["codemirror/css/jscolors.css", "codemirror/css/csscolors.css", "codemirror/css/xmlcolors.css"],
        autoMatchParens : true,
        path : 'codemirror/js/',
        height : '100%',
        width: '100%',
        content: code,
        onLoad: function() {}
      });
      this.numHTMLEditors = 0;
    } else {
      // please god don't let anyone read this code..
      $('#codeOutput' + this.numHTMLEditors).empty();
      var newId = 'codeOutput' + (parseFloat(this.numHTMLEditors)+1);
      $('#codeOutput' + this.numHTMLEditors).attr('id', newId);
      this.numHTMLEditors++;

      $('#codeOutput' + this.numHTMLEditors).dialog('open').show();
      this.htmlEditor = new CodeMirror(document.getElementById('codeOutput' + this.numHTMLEditors), {
        parserfile: ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js"],
        stylesheet: ["codemirror/css/jscolors.css", "codemirror/css/csscolors.css", "codemirror/css/xmlcolors.css"],
        autoMatchParens : true,
        path : 'codemirror/js/',
        height : '100%',
        width: '100%',
        content: code,
        onLoad: function() {}
      });
//      this.htmlEditor.setCode(code);
    }



//    $('#codeOutput').html('<textarea style="width: 100%;height: 100%;">' + code + '<\/textarea>').dialog('open').show();
  };

  UIEffects.prototype.createAutoComplete = function() {
    $("#search").autocomplete({
      data: is.autoCompleteData,
      matchContains: true,
      width: 'auto',
      scroll: false,
      scrollHeight: '400px',
      formatResult : function(result) {
        result = result[0].split(' <sup')[0];
        return result;
      },
      formatItem : function() {
        if (arguments.length > 3) {
          if (!$('.ui-autocomplete-results')[0].getAttribute('id')) {
            $('.ui-autocomplete-results')[0].id = 'acDiv';
          }
        }
        return arguments[0][0];
      }
    });
  };

  UIEffects.prototype.setAutoCompleteClicks = function() {
    $("#search").autocomplete('result', function(a, b, sampleName) {
      var sample = sampleName.split(' <sup>')[0];
      // This fixes a CRAZY bug in CodeMirror where in IE, it breaks if you
      // have the focus in another input element
      document.getElementById('edit').focus();
      window.is.showSample(sample)();
      return sample;
    });
  };

  UIEffects.prototype.createAutoCompleteDropShadow = function() {
    $('#search').bind('keyup', function() {
      var acDiv = $('#acDiv');
      try {
        if (acDiv.position() && acDiv.css('display') != 'none' && $('#acShadowDiv').length == 0) {
          $(acDiv).append($('<div id="acShadowDiv" style="width:100%;background: url(images/drop_shadows/short_b1px.png) repeat;height:15px;position:absolute;" class="">&nbsp<\/div>'));
        } else {}
      } catch(e) {}
    });
  };

  UIEffects.prototype.initAutoComplete = function() {
    $('#searchInputContainer').show();
    this.createAutoComplete();
    this.setAutoCompleteClicks();
    if (!this.is.ie6) {
      this.createAutoCompleteDropShadow();
    }
  };

  UIEffects.prototype.initSaveCodeDiv = function() {
    $("#saveCodeForm").dialog({
      modal: true,
      overlay: {
        opacity: 0.5,
        background: "black"
      },
      title: 'Save Code',
      height: 300,
      width: 400,
      resizable: false,
      autoOpen: false,
      draggable: false
    });
    // $("div.ui-dialog > div.ui-resizable-handle").css('display', 'none');
  };

  UIEffects.prototype.showSaveForm = function() {
    var curSmapleObj = this.is.sampleFileNameToObject(this.is.getCurFilename());
    var boilerplateLoc = curSmapleObj.boilerplateLoc;
    $('#boilerplateLoc').attr('value', boilerplateLoc);
    // HUGE HACK.  In IE, an input element can't store a newline character,
    // or at least I can't find out how.  So they all get lost during the send
    // so on the server side i will parse out NEWLINE!!! and add in the correct
    // code :)
    var code = this.is.getCode();
    code = code.replace(/\n/g, 'NEWLINE!!!');
    $('#jscodeSaveForm').attr('value', code);

    $('#saveCodeForm').dialog('open').show();
  };

  UIEffects.prototype.toggleDropdown = function(elID, opt_close) {
    var el = $('#' + elID);
    if (opt_close) {
      el.removeClass('expanded');
      return;
    }

    if (el.hasClass('expanded')) {
      el.removeClass('expanded');
    } else {
      el.addClass('expanded');
    }
  };

  UIEffects.prototype.changeCodeSize = function(amount) {
    var editor = this.uiEls.editor;
    var edit = $('#edit');
    var select = $('#selectCode');
    var selContainer = this.uiEls.selectContainer;
    var codeContainer = $('#codeContainer');
    var curEditorHeight = editor.css('height');
    var curEditHeight = edit.css('height');
    var selectHeight = select.css('height');
    var selContainerHeight = selContainer.css('height');
    var codeContainerHeight = codeContainer.css('height');
    var newEditorHeight = parseFloat(curEditorHeight) + amount;
    var newEditHeight = parseFloat(curEditHeight) + amount;
    var newSelectHeight = parseFloat(selectHeight) + amount;
    var newSelContainerHeight = parseFloat(selContainerHeight) + amount;
    var newCodeContainerHeight = parseFloat(codeContainerHeight) + amount;
    editor.css('height', newEditorHeight + 'px');
    edit.css('height', newEditHeight + 'px');
    select.css('height', newSelectHeight + 'px');
    if (!newSelContainerHeight) {
      newSelContainerHeight = newCodeContainerHeight;
    }
    selContainer.css('height', newSelContainerHeight + 'px');
    codeContainer.css('height', newCodeContainerHeight + 'px');

    this.setDivShadow('outputDiv', 'runShadowContainer');
    this.setDivShadow('editor', 'editShadowContainer');
    this.setDivShadow('selectContainer', 'pickShadowContainer');
  };










  function RunBox() {
    this.outputContainer;
    this.runShadowContainer;
    this.runBoxPoppedOut;
    this.popoutWindow;
    this.is;
    this.runBoxDiv;
    this.popoutRunBoxDiv;
    this.resizable;
  }

  RunBox.prototype.init = function(is, resizable) {
    this.resizable = resizable;
    this.runBoxDiv = document.getElementById('runbox');
    this.runBoxPoppedOut = false;
    this.outputContainer = $("#outputContainer");
    this.runShadowContainer = $("#runShadowContainer");
    this.is = is;
  };

  RunBox.prototype.hideOnScreenRun = function() {
    // body...
  };

  RunBox.prototype.createIframe = function(boilerplateLoc) {
    // Because safari is CRAZY.  There is a bug in safari.  Without this statement
    // if you refresh the browser and look at a sample, it won't work.  Upon refresh
    // safari will use the EXACT SAME URL for the iFrame as before the refresh,
    // ignoring that i'm passing in a NEW URL for boilerplateLoc.
    // If you load the iFrame first, THEN set the src, Safari likes it.
    // Lame.
    if ($.browser.safari) {
      var iFrame = $('<iframe id="runFrame"><\/iframe>');
      iFrame = this.setNewCodeRunIframeWidthHeight(iFrame);
      $(this.runBoxDiv).empty().append(iFrame);
      iFrame = iFrame.get(0);
      iFrame.src = boilerplateLoc;
    } else {
      var iFrame = $('<iframe src="'+boilerplateLoc+'" id="runFrame"><\/iframe>');
      iFrame = this.setNewCodeRunIframeWidthHeight(iFrame);
      $(this.runBoxDiv).empty().append(iFrame);
    }
  };

  RunBox.prototype.setNewCodeRunIframeWidthHeight = function(iFrame) {
    var fakeDiv = $('<div id="fakeCalcDiv"><\/div>');
    $(this.runBoxDiv).prepend(fakeDiv);
    var outputDiv = $('#outputDiv');
    var containerHeight = outputDiv.height();
    var containerCurPos = outputDiv.offset();
    var curDivPos = $(fakeDiv).offset();
    var height = containerHeight - curDivPos.top + containerCurPos.top;
    if (this.resizable) height -= 15;

    return $(iFrame).css('height', height + 'px');
  };

  RunBox.prototype.createIframeOrPopout = function(response) {
    var url = 'http://savedbythegoog.appspot.com/retrieve_cache?unique_id=' + response;
    if (!is.runBox.runBoxPoppedOut) {
      window.is.runBox.createIframe(url);
    } else {
      // Run code in the popout window
      var runbox = window.is.runBox.popoutWindow.document.getElementById('runbox');
      runbox.innerHTML = '';
      window.is.runBox.popoutWindow.addIframe(url);
    }
  };

  RunBox.prototype.sendCodeToSavedByTheGoog = function(code) {
    var self = this;
    var cacheCodeLoc = location.protocol + '//' + location.host + '/apis/ajax/playground/cacheCode';
    $.post(cacheCodeLoc, {'code': code}, window.is.runBox.createIframeOrPopout);
  }

  RunBox.prototype.runCode = function() {
    var apiKey = savedByTheGoogAPIKey;
    this.is.getFullSrc(this.sendCodeToSavedByTheGoog, apiKey);
  };

  RunBox.prototype.changeToPopout = function() {
    this.runBoxPoppedOut = true;
    $(this.outputContainer).hide();
    $(this.runShadowContainer).hide();
    this.popoutWindow = window.open('popout.html','popout', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=1');
  };

  RunBox.prototype.changeToInline = function() {
    this.runBoxPoppedOut = false;
    $(this.outputContainer).show();
    $(this.runShadowContainer).show();
    this.is.runCode();
  };


  // Create and export the interactive sample instance to the global.
  window.is = new InteractiveSample();
})();