var VideoInfo = {
  worksheets: {
    mv: 'od6',
    br: 'od5',
    uk: 'od7',
    fr: 'od4',
    es: 'oda',
    de: 'odb',
    jp: 'od8',
    au: 'od9',
    cn: 'ocy',
    ru: 'ocz'
  },

  load: function(json) {
    for (var x in json.feed.entry) {
      var entry = json.feed.entry[x];
      if (entry['gsx$videourl']) {
        var videourl  = entry['gsx$videourl']['$t'];
        var sessionid = entry['gsx$sessionid']['$t'];

        if (videourl) {
          var videodiv = document.getElementById('video_' + sessionid);
          if (videodiv) {
            videodiv.innerHTML = 'Video: <a href="' + videourl + '">watch this session</a> <img style="vertical-align:text-bottom;" src="images/youtube_logo.gif"/>';         
          }
        }
      }
    }
  },

  init: function(location) {
    var script = document.createElement('script');
    script.setAttribute('src',    'http://spreadsheets.google.com/feeds/list/o02435648245086784585.7970192885406077269/' + VideoInfo.worksheets[location] + '/public/values?alt=json-in-script&callback=VideoInfo.load');
    script.setAttribute('id', 'jsonScript');
    script.setAttribute('type', 'text/javascript');
    document.documentElement.firstChild.appendChild(script); 
  }
};

