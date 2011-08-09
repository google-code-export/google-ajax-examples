/*
* Simple player embed
*/

// The video to load.
var videoID = "ylLzyHk54Z0"
// Lets Flash from another domain call JavaScript
var params = { allowScriptAccess: "always" };
// The element id of the Flash embed
var atts = { id: "ytPlayer" };
// All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "?version=3&enablejsapi=1&playerapiid=player1", 
                   "videoDiv", "480", "295", "9", null, null, params, atts);

