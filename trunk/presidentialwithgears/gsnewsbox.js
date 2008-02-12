(function () {

function NewsBox(container, opt_options) {
  this.browserFun();
  this.linkTarget = '_blank';
  this.horizontalMode = true;
  this.successCount = 0;
  this.headerTitle = null;
  this.currentResult = null;
  this.moreTitle = "Read More";
  this.autoOpenMode = false;

  // animation stuff (todo allow override, smoothing?)
  this.animate = false;
  this.deltaPx = 12;
  this.tickMs = 25;
  this.startHeight = 4;

  // Assign container
  if (typeof container == "string") {
    container = document.getElementById(container);
  }
  this.container = container;

  if (opt_options) {
    if (opt_options.linkTarget) {
      this.linkTarget = opt_options.linkTarget;
    }
    if (opt_options.animate) {
      this.animate = opt_options.animate;
    }
    if (opt_options.moreTitle) {
      this.moreTitle = opt_options.moreTitle;
    }
    if (opt_options.autoOpenMode) {
      this.autoOpenMode = opt_options.autoOpenMode;
    }

    /**
     * Boot Mode should remain last
     */
    if (opt_options.bootMode) {
      var title = '';
      if (opt_options.title) {
        title = opt_options.title;
      }
      this.buildStaticNewsBox(container, opt_options.bootMode, title);
      return;
    }
  }

  // Finish up the constructor by grabbing searcher and creating ui.
  this.bootSearcher();

  // now build out the containers
  this.buildContainers(true);
}
NewsBox.MORE_FROM_PUBLISHER = 1;

// Note: Properties set by this function ARE public
NewsBox.prototype.browserFun = function() {
  // Browser fun.
  if (window.ActiveXObject) {
    this.ie = this[window.XMLHttpRequest ? 'ie7' : 'ie6'] = true;
  } else if (window.opera) {
    this.opera = true;
  } else if (document.childNodes && !document.all && !navigator.taintEnabled) {
    this.safari = true;
  } else if (document.getBoxObjectFor != null) {
    this.gecko = true;
  }
}

NewsBox.prototype.bootSearcher = function() {
  // create the search object
  this.news = new google.search.NewsSearch();
  this.news.setNoHtmlGeneration();
  this.news.setSearchCompleteCallback(this,
                                      NewsBox.prototype.searchComplete, [null]);
  this.news.setResultSetSize(google.search.Search.LARGE_RESULTSET);
}

// expose the object
window.NewsBox = NewsBox;

// simple result fetcher
NewsBox.fetch = function(query, cb) {
  var url = 'http://www.google.com/uds/GnewsSearch?rsz=large&v=1.0' +
    '&gss=.com&lstkp=0&q=' + encodeURIComponent(query) +
    '&callback=' + cb + '&context=y';
  document.write("<script src='" + url + "'></script>");
}

NewsBox.prototype.loadNewsBox = function(query, title) {
  this.headerTitle = title;
  var html = gearsAJAXHelper.returnKeyVal(query);
  
  if(html && query != 'united states any_politics') {
    console.log("Query: " + query + " -- loaded from Gears.");
    var newsBoxDiv = document.getElementById('newsbox');
    newsBoxDiv.innerHTML = html;

    this.root = newsBoxDiv.childNodes[0];

    this.header = this.root.childNodes[0];
    this.results = this.root.childNodes[1];
    this.footer = this.root.childNodes[2];
    this.news.execute(query);
  } else {
    this.news.execute(query);
  }
}

NewsBox.prototype.getGearsBranding = function() {
  var gearsTR = document.createElement('tr');
  var gearsTD1 = document.createElement('td');
  var gearsTD2 = document.createElement('td');
  gearsTD1.className = 'gsc-branding-text';
  gearsTD1.innerHTML = '<div class="gsc-branding-text"></div>';

  gearsTD2.className = 'gsc-branding-img-noclear';
  gearsTD2.innerHTML = '<a border=0 target="_blank" href="http://gears.google.com"><img class="gsc-branding-img-noclear" src="gears.png"/></a>';
  gearsTR.appendChild(gearsTD1);
  gearsTR.appendChild(gearsTD2);

  this.footer.childNodes[0].childNodes[0].childNodes[0].appendChild(gearsTR);
}

NewsBox.prototype.searchComplete = function() {
  this.clearResults();
  if (this.news.results && this.news.results.length > 0) {
    this.header.innerHTML = this.headerTitle;
    if (this.successCount == 0) {
      google.search.Search.getBranding(this.footer);
      
      this.getGearsBranding();
      
      this.successCount++;
    }
    for (var i=0; i<this.news.results.length; i++) {
      var rootClassValue = "nbx-result nbx-minimized";
      if (i==0 && this.autoOpenMode) {
        rootClassValue = "nbx-result nbx-maximized";
      }
      var root = this.drawResult(this.news.results[i],
        { rootClass : rootClassValue });
        if (i==0 && this.autoOpenMode) {
          this.currentResult = root;
        }
      }
      var html = document.getElementById('newsbox').innerHTML;
      gearsAJAXHelper.storeKeyVal(this.news.Cb, html);
      console.log("Query: " + this.news.Cb + " -- loaded from Internet.");

    } else {
      // todo mark as no results? Whats the
      // no-results behavior you are looking for?
    }
  }

NewsBox.prototype.clearResults = function() {
  this.currentResult = null;
  this.removeChildren(this.results);
  this.removeChildren(this.header);
}

NewsBox.prototype.drawResult = function(res, opt_options) {
  // title
  // publisher - date
  // snippet
  var rootClass = "nbx-result nbx-minimized";
  if (opt_options && opt_options.rootClass) {
    rootClass = opt_options.rootClass;
  }
  var root = this.createDiv(null, rootClass);
  var div;

  // title
  div = this.createDiv(res.titleNoFormatting, "nbx-title");
  div.onclick = this.methodClosure(this, NewsBox.prototype.twiddle, [root]);

  root.appendChild(div);

  var expando = this.createDiv(null, "nbx-expando");
  root.appendChild(expando);

  // publisher
  div = this.createDiv(res.publisher, "nbx-publisher");
  expando.appendChild(div);

  // location
  var locationArray = res.location.split(",");
  if (locationArray.length > 1) {

    // grab the last location and use that, but only if there
    // is meat to the location?
    var lastLocation = ", " + locationArray[locationArray.length - 1];

    div = this.createDiv(lastLocation, "nbx-location");
    expando.appendChild(div);
  }

  // published date
  var pubDate = new Date(res.publishedDate);
  div = this.createDiv(" - " + this.news.formatToRelativeDate(pubDate), "nbx-date");
  expando.appendChild(div);

  // snippet
  div = this.createDiv(null, "nbx-snippet-wrapper");
  var span = this.createSpan(res.content, "nbx-snippet");
  var moreTitle = this.moreTitle;
  if (moreTitle == NewsBox.MORE_FROM_PUBLISHER) {
    moreTitle = "read on " + res.publisher;
  }
  var moreLink = this.createLink(res.unescapedUrl, moreTitle, this.linkTarget,
                                 "nbx-morelink", true);
  div.appendChild(span);
  div.appendChild(moreLink);
  expando.appendChild(div);

  this.results.appendChild(root);
  return root;
}

NewsBox.prototype.clearAnimateTwiddle = function() {
  if (this.animateTimer) {
    window.clearInterval(this.animateTimer);
    this.animateTimer = null;
  }
}

NewsBox.prototype.animateTwiddleOpen = function(element) {
  var h = element.offsetHeight;
  var d = this.deltaPx;
  if ((h + d) < element.fullHeight) {
    h += d;
    element.style.height = h + 'px';
  } else {
    // done..
    element.style.height = 'auto';
    this.clearAnimateTwiddle();
  }
}

NewsBox.prototype.animateTwiddleClosed = function(element) {
  var h = element.offsetHeight;
  var d = this.deltaPx;
  if ((h - d) > 0) {
    h -= d;
    element.style.height = h + 'px';
  } else {
    // done..
    element.style.height = 'auto';
    this.cssSetClass(this.currentResult, "nbx-result nbx-minimized");
    this.currentResult = null;
    this.clearAnimateTwiddle();
  }
}

NewsBox.prototype.openNew = function(element) {
  if (this.animate) {
    var expando = element.childNodes[1];
    if (!expando.fullHeight) {
      // snapshot. I know this technically changes on font resize,
      // but side effect is minimal.
      this.cssSetClass(element, "nbx-result nbx-maximized");
      expando.fullHeight = expando.offsetHeight;
    }
    // Set to start height.
    expando.style.height = this.startHeight + 'px';
    var cb = this.methodClosure(this, this.animateTwiddleOpen, [expando]);
    this.animateTimer = window.setInterval(cb, this.tickMs);
  }
  this.cssSetClass(element, "nbx-result nbx-maximized");
  this.currentResult = element;
}

NewsBox.prototype.closeCurrent = function(animate) {
  if (!this.currentResult) return;
  var expando = this.currentResult.childNodes[1];
  if (!this.animate || !animate) {
    expando.style.height = 'auto';
    this.cssSetClass(this.currentResult, "nbx-result nbx-minimized");
    this.currentResult = null;
  } else {
    var cb = this.methodClosure(this, this.animateTwiddleClosed, [expando]);
    this.animateTimer = window.setInterval(cb, this.tickMs);
  }
}

NewsBox.prototype.twiddle = function(element) {
  this.clearAnimateTwiddle();
  var cl = element.className;
  if (cl.search(/nbx-minimized/) != -1) {
    // conditionally close the current item
    this.closeCurrent();
    this.openNew(element);
  } else {
    // the current result is being closed, so animate..
    this.closeCurrent(true);
  }
}


/**
 * Build out the various containers...
 * <container>
 *  <header/>
 *  <results>
 *    <result/>0..n
 *  </results>
 *  <footer/>
 * </container>
 */
NewsBox.prototype.buildContainers = function(bindToPage) {
  this.root = this.createDiv(null, "nbx-root");

  this.header = this.createDiv(null, "nbx-header");
  this.results = this.createDiv(null, "nbx-results");
  this.footer = this.createDiv(null, "nbx-footer");

  this.root.appendChild(this.header);
  this.root.appendChild(this.results);
  this.root.appendChild(this.footer);

  // bind to page
  if (bindToPage) {
    this.removeChildren(this.container);
    this.container.appendChild(this.root);
  }
}

NewsBox.prototype.buildStaticNewsBox = function(container, r, title) {
  this.buildContainers(false);

  this.header.innerHTML = title;

  var html = new Array();
  for (var i=0; i<r.results.length; i++) {
    if (i==0 && this.autoOpenMode) {
      html.push('<div class="nbx-result nbx-maximized">');
      html.push('<div class="nbx-title">' + r.results[i].titleNoFormatting + '</div>');
      // now add expando div and all the rest...
      html.push('<div class="nbx-expando">');
      html.push('<div class="nbx-publisher">' + r.results[i].publisher + '</div>');
      // location
      var locationArray = r.results[i].location.split(",");
      if (locationArray.length > 1) {
        // grab the last location and use that, but only if there
        // is meat to the location?
        var lastLocation = ", " + locationArray[locationArray.length - 1];
        html.push('<div class="nbx-location">' + lastLocation + '</div>');
      }
      // published date
      var pubDate = new Date(r.results[i].publishedDate);
      //html += '<div class="nbx-date"> - ' + this.news.formatToRelativeDate(pubDate) + '</div>';

      html.push('<div class="nbx-snippet-wrapper">');
      html.push('<span class="nbx-snippet">' + r.results[i].content + '</span>');
      var moreTitle = this.moreTitle;
      if (moreTitle == NewsBox.MORE_FROM_PUBLISHER) {
        moreTitle = "read on " + r.results[i].publisher;
      }
      html.push('<div class="nbx-morelink">');
      html.push('<a class="nbx-morelink" href="' + r.results[i].unescapedUrl + 
              '" target="' + this.linkTarget + '" >' + moreTitle + "</a>");
      html.push('</div>'); // morelink
      html.push('</div>'); // snippet-wrapper
      html.push('</div>'); // expando
      html.push('</div>'); // result
    } else {
      html.push('<div class="nbx-result nbx-minimized">');
      html.push('<div class="nbx-title">' + r.results[i].titleNoFormatting);
      html.push('</div></div>');
    }
  }
  if (html.length == 0) {
    html.push('<div></div>');
  }
  this.results.innerHTML = html.join("");
  this.buildStaticBranding();
  this.container.appendChild(this.root);
}

// gsearch.css required to be loaded.
NewsBox.prototype.buildStaticBranding = function() {
  var html = new Array();
  html.push('<div class="gsc-branding">');
  html.push('<table class="gsc-branding" cellspacing="0" cellpadding="0">');
  html.push('<tbody><tr><td class="gsc-branding-text">');
  html.push('<div class="gsc-branding-text">powered by</div></td>');
  html.push('<td class="gsc-branding-img-noclear">');
  if (this.ie6) {
    // for ie6, we need to alpha blend the image
    html.push('<div style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://www.google.com/uds/css/small-logo.png);width:51px;height:15px"</div>');
  } else {
    html.push('<img class="gsc-branding-img-noclear"');
    html.push('src="http://www.google.com/uds/css/small-logo.png"/>');
  }

  html.push('</td></tr></tbody></table></div>');
  this.footer.innerHTML = html.join("");
}

NewsBox.prototype.cssSetClass = function(el, className) {
  el.className = className;
}

NewsBox.prototype.createElement = function(key, opt_text, opt_suffix) {
  var elType = this.getSemanticType(key);
  var el = document.createElement(elType);
  if (opt_text) {
    el.innerHTML = opt_text;
  }
  el.className = this.getClassNames(key, opt_suffix);
  return el;
}

NewsBox.prototype.createDiv = function(opt_text, opt_className) {
  var el = document.createElement("div");
  if (opt_text) {
    el.innerHTML = opt_text;
  }
  if (opt_className) { el.className = opt_className; }
  return el;
}

NewsBox.prototype.createSpan = function(opt_text, opt_className) {
  var el = document.createElement("span");
  if (opt_text) {
    el.innerHTML = opt_text;
  }
  if (opt_className) { el.className = opt_className; }
  return el;
}

NewsBox.prototype.removeChildren = function(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
NewsBox.prototype.methodClosure = function(object, method, opt_argArray) {
  return function() {
    return method.apply(object, opt_argArray);
  }
}

NewsBox.prototype.createLink = function(href, opt_text, opt_target,
                                          opt_className, opt_divwrap) {
  var el = document.createElement("a");
  el.href = href;
  if (opt_text) {
    el.appendChild(document.createTextNode(opt_text));
  }
  if (opt_className) {
    el.className = opt_className;
  }
  if (opt_target) {
    el.target = opt_target;
  }
  if (opt_divwrap) {
    var div = this.createDiv(null, opt_className);
    div.appendChild(el);
    el = div;
  }
  return el;
}
function dw(str) {
  document.write(str);
}
})();