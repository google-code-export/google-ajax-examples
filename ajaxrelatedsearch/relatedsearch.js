var RelatedSearchFinder = {
  find: function() {
    var count = 0;
    document.getElementsByClassName('searchterm').each(function(node) {
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
      this.showContent = '<a id="' + this.domId + '" href="javascript:void(0)">' + content + '</a>';
      this.hideContent = '<a id="' + this.domId + '" href="javascript:void(0)">' + content + '</a>';
    }

    this.holder.innerHTML = '<span class="action">' + this.showContent + '</span><div class="results" style="position: absolute; z-index: 1; width: 300px; font-size: small; border: solid 1px #999; background-color: #fff; margin: 5px; padding: 5px; display: none;"></div>';
    
    this.type = this.holder.hasClassName('using:news') ? 'news' : 'blog';
    this.resultStyle = this.holder.hasClassName('withstyle:expanded') ? GSblogBar.RESULT_STYLE_EXPANDED : GSblogBar.RESULT_STYLE_COMPRESSED;
    this.orderBy = this.holder.hasClassName('orderby:relevance') ? GSearch.ORDER_BY_RELEVANCE : GSearch.ORDER_BY_DATE;
    
    this.term = this.holder.getAttribute("title");
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
    this.results.show();
  },
  
  setHandler: function(showOrHide) {
    var self = this;
    document.getElementById(this.domId).onclick = function() {
      eval("self." + showOrHide + "();"); // this is a bit naughty, but who cares.
    }
  }

};

Event.observe(window, 'load', RelatedSearchFinder.find, false);


