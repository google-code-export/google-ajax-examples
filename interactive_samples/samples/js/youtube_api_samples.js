var tempJSON = [
  {
    "category":"YouTube APIs-Player API",
    "samples":[
      {"boilerplateLoc":"samples/boilerplateHTML/youtube/simple_embed.html", "files":["samples/js/youtube/simple_embed.js"], "sampleName":"Simple Embed", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/youtube/polling_player.html", "files":["samples/js/youtube/polling_player.js"], "sampleName":"Polling the Player", "tags": ""}, 
      {"boilerplateLoc":"samples/boilerplateHTML/youtube/change_video.html", "files":["samples/js/youtube/change_video.js"], "sampleName":"Change the Playing Video", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/youtube/multiple_players.html", "files":["samples/js/youtube/multiple_players.js"], "sampleName":"Working with Multiple Players", "tags": ""},
      {"boilerplateLoc":"samples/boilerplateHTML/youtube/chromeless.html", "files":["samples/js/youtube/chromeless.js"], "sampleName":"Chromeless Player", "tags": ""}
    ],
    "docsUrl": "http://code.google.com/apis/youtube/js_api_reference.html"
  }
];


if (typeof codeArray != 'undefined' && codeArray.length) {
  codeArray = codeArray.concat(tempJSON);
  delete tempJSON;
} else {
  window.codeArray = tempJSON;
  delete tempJSON;
}
