var FeedBillboardFinder = {
  find: function() {
    var count = 0;
    document.getElementsByClassName('feedbillboard').each(function(node) {
      FeedBillboardFinder.build(node, ++count);
    });
  },
  
  build: function(node, id) {
    // -- Get the feeds
    var list = node.getElementsByTagName('li');
    var feeds = [];

    for (var i = 0; i < list.length; i++) {
      var links = list[i].getElementsByTagName('a');
      if (links.length > 1) {
        var theFeed = {};
        theFeed.title   = links[0].textContent;
        theFeed.linkURL = links[0].getAttribute("href");
        theFeed.rssURL  = links[1].getAttribute("href");
        feeds.push(theFeed);
        //alert("Title: " + theFeed.title + ", URL: " + theFeed.linkURL + ", RSS: " + theFeed.rssURL);
      }
    }
    
    // -- Get the options
    var options = {
      id: id,
      numberofentries: 5,
      timeinterval: 10000,
      access: 'inorder'
    };

    if (match = node.className.match(/numberofentries:(\d+)/i)) {
      options.numberofentries = Number(match[1]);
    }

    if (match = node.className.match(/timeinterval:(\d+)/i)) {
      options.timeinterval = Number(match[1]) * 1000; // ask for seconds, create millis
    }
  
    if (node.hasClassName('access:randomly')) { options.access = 'randomly'; }
    
    // -- Create the main object
    new FeedBillboard(node, feeds, options);
  }
};

var FeedBillboard = Class.create();

FeedBillboard.prototype = {
  initialize: function(e, feeds, options) {
    this.holder = e;
    this.feeds = feeds;
    this.options = options;
    this.options.domId = 'billboard' + this.options.id;
    
    this.feedOutput = [];
    
    this.loaded = false;
    
    this.createBillboard();
  },
  
  createBillboard: function() {
    this.replace(); // replace the ul with a div that we can do our deed in
    this.start(); // fill it up
  },
  
  replace: function() {
    var newNode = document.createElement("div");
    newNode.setAttribute("id", this.options.domId);
    newNode.setAttribute("class", "renderedbillboard")
    
    this.holder.parentNode.replaceChild(newNode, this.holder);
    this.holder = $(this.options.domId); // get it again
  },
  
  start: function() {
    this.loadAll();
  },
  
  loadAll: function() {
    for (var i = 0; i < this.feeds.length; i++) {
      this.load(this.feeds[i]);
    }
    this.showEntry(1);
  },
  
  load: function(feedSettings) {
    var self = this;
    new google.feeds.Feed(feedSettings.rssURL).load(function(result) {
      if (!result.error) {
        self.feedOutput.push(result.feed);
      }
    });
  },
  
  showEntry: function(shown) {
    var self = this;
    if (self.feedOutput.length < 1) {
      setTimeout(function() {
        self.showEntry(1);
      }, 1000);
      return;
    }
    
    var feed = this.chooseFeed(shown);

    var branding = '<div class="brandingBox_gsblb" style="margin-top: -12px;"><div class="gsc-branding"><table class="gsc-branding" cellpadding="0" cellspacing="0"><tbody><tr><td class="gsc-branding-text"><div class="gsc-branding-text">powered by</div></td><td class="gsc-branding-img-noclear"><a class="gsc-branding-clickable" target="_BLANK" href="http://blogsearch.google.com"><img class="gsc-branding-img-noclear" src="http://www.google.com/uds/css/small-logo.png"></a></td></tr></tbody></table></div></div></div>';
    
    var title = '<div class="billboardtitle"><a href="' + feed.entries[0].url + '" title="' + feed.entries[0].publishedDate + '">' + feed.entries[0].title + '</a></div>';
    var snippet = '<div class="billboardsnippet" style="color: grey; padding: 5px;">' + feed.entries[0].contentSnippet + '</div>'
    var feedsource = '<div class="billboardsource"><a href="' + feed.linkURL + '" style="text-decoration: none; color: #000">' + feed.title + '</a></div>';
    
    this.holder.innerHTML = '<div class="results" style="width: 240px; font-size: small; border: solid 1px #999; background-color: #fff; margin: 4px; padding: 5px;"><div id="fader">' + title + snippet + feedsource + '</div>' + branding;

    if (shown > 1) {
      $('fader').setOpacity(0.0);
      Effect.Appear($('fader'), { duration: 2.0 });
    }

		//google.feeds.Feed.getBranding(document.getElementById("branding"));

    this.intervalID = window.setInterval(function() {
      self.showEntry(++shown);
    }, this.options.timeinterval);
  },
  
  chooseFeed: function(shown) {
    return this.feedOutput[shown % this.feedOutput.length];
  }
  
};

Event.observe(window, 'load', FeedBillboardFinder.find, false);

/*
<ul class="feedbillboard numberofentries:5 access:randomly timeinterval:10">
  <li><a href="http://almaer.com/blog">techno.blog(Dion)</a> (<a href="http://almaer.com/blog/index.xml">RSS</a>)</li>
  <li><a href="http://code.google.com/">Google Code</a> (<a href="http://code.google.com/feeds/updates.xml">RSS</a>)</li>
  <li><a href="http://ajaxian.com/">Ajaxian</a> (<a href="http://ajaxian.com/feed">RSS</a>)</li>
</ul>
*/
