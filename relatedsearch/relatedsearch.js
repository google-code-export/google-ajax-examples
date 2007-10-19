var RelatedSearchFinder = {
  find: function() {
    var count = 0;
    //document.getElementsByClassName('searchterm').each(function(node) {
    $$('.searchterm').each(function(node) {
      new RelatedSearch(node, ++count);
    });
  }
};

var RelatedSearch = Class.create();

RelatedSearch.prototype = {
  initialize: function(e, id) {
    this.holder = e;
    this.id = id;
    this.domId = 'relatedsearch' + this.id;

    var content = this.holder.innerHTML;
    
    if (content.blank()) {
      this.showContent = '<button id="' + this.domId + '" style="font-size: x-small; background-color: #FAFAFA;">show related</button>';
      this.hideContent = '<button id="' + this.domId + '" style="font-size: x-small; background-color: #FAFAFA;">hide related</button>';
    } else {
      this.showContent = '<a class="relatedsearchlink" style="text-decoration: none;" id="' + this.domId + '" href="javascript:void(0)">' + content + '</a>';
      this.hideContent = '<a class="relatedsearchlink" style="text-decoration: none;" id="' + this.domId + '" href="javascript:void(0)">' + content + '</a>';
    }

    this.holder.innerHTML = '<span class="action">' + this.showContent + '</span><div class="dropshadow" style="position: absolute; background-color: #666; margin: 4px 0 0 0; width: auto; z-index: 1; opacity: .95; filter: alpha(opacity=95);"><div class="results" style="position: relative; z-index: 2; width: 300px; font-size: small; border: solid 1px #999; background-color: #fff; margin: -2px 2px 2px -2px; padding: 5px; display: none;">Loading...</div></div>';
    
    this.type = this.holder.hasClassName('using:news') ? 'news' : 'blog';
    this.resultStyle = this.holder.hasClassName('withstyle:expanded') ? GSblogBar.RESULT_STYLE_EXPANDED : GSblogBar.RESULT_STYLE_COMPRESSED;
    this.orderBy = this.holder.hasClassName('orderby:relevance') ? GSearch.ORDER_BY_RELEVANCE : GSearch.ORDER_BY_DATE;
    
    this.term = this.getTerm();
    this.action = document.getElementsByClassName('action', this.holder)[0];
    this.results = document.getElementsByClassName('results', this.holder)[0];
    
    this.setHandler('show');
  },

  show: function() {
    this.load();
    this.action.innerHTML = this.hideContent;
    this.setHandler('hide');
  },
  
  hide: function() {
    this.results.hide();
    this.action.innerHTML = this.showContent;
    this.setHandler('show');
  },

  load: function() {
    this.results.show(); // show as soon as possible

    var options = {
      largeResultSet: false,
      resultStyle: this.resultStyle,
      title: "Related content on " + this.term,
      orderBy: this.orderBy,
      autoExecuteList: {
        executeList: [ this.term ]
      }
    };
        
    eval("new GS" + this.type + "Bar(this.results, options);");

    var titleClass = (this.type == 'news') ? 'titleBox_gsnb' : 'titleBox_gsblb';

    var closeAttach = document.getElementsByClassName(titleClass, this.results)[0];
    if (closeAttach) {
      closeAttach.innerHTML = '<img id="close' + this.domId + '" src="close.png" title="close" style="display: inline; margin: 0; border: 0; padding: 0; float: right; cursor: pointer;"/> ' + closeAttach.innerHTML;
    
      var self = this;
      var closeImage = $('close' + this.domId).onclick = function() {
        self.hide();
      }
    }
  },
  
  setHandler: function(showOrHide) {
    var self = this;
    $(this.domId).onclick = function() {
      eval("self." + showOrHide + "();"); // this is a bit naughty, but who cares.
    }
  },
  
  /*
   * Get the search term and reset the abbr title to degrade a little nicer
   */
  getTerm: function() {
    var title = this.holder.getAttribute("title");
    if (match = title.match(/^search for(:)?\s*(.*)/i)) {
      title = match[2];
    } else {
      this.holder.setAttribute("title", "search for " + title);
    }
    return title;
  }

};

Event.observe(window, 'load', RelatedSearchFinder.find, false);


