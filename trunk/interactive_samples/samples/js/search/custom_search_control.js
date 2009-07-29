/*
 * This sample shows how to create a Custom Search Control.  By default, it
 * will allow you to add a search box to your page that searches your site.
 * Optionally, you can give it a CSE ID (http://www.google.com/coop/cse/) to
 * have it search sites you specify
*/

google.load('search', '1');

function OnLoad() {
  // Create a custom search control that uses a CSE restricted to code.google.com
  var customSearchControl = new google.search.CustomSearchControl('012157912978810372049:-cv6ao3zqua');

  // Draw the control in content div
  customSearchControl.draw('content'); 
  
  // run a query
  customSearchControl.execute('ajax api');
}
google.setOnLoadCallback(OnLoad);​