/*
*  How to use the Dynamic Feed Control, which has pretty UI already made for you!
*/

google.load('feeds', '1');

function OnLoad() {
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
  };

  new GFdynamicFeedControl(feeds, 'content', options);
}

google.setOnLoadCallback(OnLoad);