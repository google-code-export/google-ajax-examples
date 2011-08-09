/**
 * Resizing the player in JavaScript.
 */

// Make the player small.
function smallPlayer() {
  resizePlayer(480, 295);
}

// Set the player back to normal.
function normalPlayer() {
  resizePlayer(560, 340);
}

// Make the player big.
function largePlayer() {
  resizePlayer(640, 385);
}

// Set the loaded player to a specific height and width.
function resizePlayer(width, height) {
  var playerObj = document.getElementById("ytPlayer");
  playerObj.height = height;
  playerObj.width = width;
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // The video to load
  var videoID = "ylLzyHk54Z0"
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                     "?version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", "560", "340", "9", null, null, params, atts);
}