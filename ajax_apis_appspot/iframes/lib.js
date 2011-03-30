/* Copyright 2011 Google Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/**
 * @fileoverview Helps generate requests to the duplicate iframe detection
 * server.
 * @author j.s@google.com (Jeff Scudder)
 */

/**
 * Namespace for detecting duplicate iframes.
 * @type {Object}
 */
var dupif = {};

/**
 * Pings the logging URL for this server. Uses a unique timestamp to avoid
 * duplicate requests.
 * @param {string} message A descriptive message to be recorded in the log.
 */
dupif.log = function(message) {
  var img = document.createElement('img');
  img.src = '//{{ host }}/iframes/log?t=' + (new Date()).getTime() + '&msg=' +
      encodeURIComponent(message);
};

/**
 * Creates a unique URL (based on timestamp) for the server's iframe endpoint.
 * @return {string} A URL for a new iframe.
 */
dupif.genIframeUrl = function() {
  var url = '//{{ host }}/iframes/iframe?t=' + (new Date()).getTime();
  if (window.location.search) {
    url += '&' + window.location.search;
  }
  return url;
};
