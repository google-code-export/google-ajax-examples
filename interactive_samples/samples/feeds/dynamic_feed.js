/*
*  How to use the Dynamic Feed Control, which has pretty UI already made for you!
*  Don't forget to add the Dynamic Feed Control script/CSS into your HTML:
*  <script src="http://www.google.com/uds/solutions/dynamicfeed/gfdynamicfeedcontrol.js"
*          type="text/javascript"></script>
*  <link rel="stylesheet" href="http://www.google.com/uds/solutions/dynamicfeed/gfdynamicfeedcontrol.css"
*        type="text/css" charset="utf-8">
*/

google.load('feeds', '1');

function LoadDynamicFeedControl() {
  var feeds = [
    {
      title: 'People',
      url: 'http://rss.people.com/web/people/rss/topheadlines/index.xml'
    },
    {
      title: 'E-Online',
      url: 'http://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml'
    },
    {
      title: 'TMZ',
      url: 'http://www.tmz.com/rss.xml'
    }
  ];

  var options = {
    stacked : true,
    horizontal : false,
    title : "Hollywood News"
  }

  new GFdynamicFeedControl(feeds, 'feed-control', options);
}

google.setOnLoadCallback(OnLoad);