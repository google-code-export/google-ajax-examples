/* Copyright (c) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

google.load("feeds", "1");

function initBlogReader() {
        var code;
        if (homelocation == 'mv') {
          code = 'us';
        } else if (homelocation == 'jp') {
          code = 'ja';
        } else {
          code = homelocation;
        }

	loadBlog("http://googledeveloperday2007-" + code + ".blogspot.com/atom.xml", "googleblogs");
}

function loadBlog(blogURL, div) {
	var count = 0;
	var random = Math.floor(Math.random() * 1000);
	var feed = new google.feeds.Feed(blogURL);

	feed.load(function(result) {
		if (!result.error) {
	  		var html = '<ul>';
	  		var container = document.getElementById(div);

			for (var i = 0; i < result.feed.entries.length; i++) {
		  		var entry = result.feed.entries[i];
				// fix issue with test post
				if (entry.link == 'http://googledeveloperday2007-us.blogspot.com/2007/04/getting-excited-for-first-google.html') {
				  continue;
				  i--;
				}
		  		var contentSnippet = '';
		  		if (i < 2) { // show content snippets for the first two
					var snip = stripAndTruncate(entry.content);
					contentSnippet = '<p>' + snip + ' <a href="' + entry.link + '"><nobr>' + blog_read_more + ' &raquo;</nobr></a></p>';
		  		}
				html += '<li><a href="' + entry.link + '">' + entry.title + '</a>';
				if (entry.author && entry.author != '(author unknown)') {
					html += ' ' + blog_posted_by + ' ' + entry.author + contentSnippet + '</li>';
				}
			}

			html += '</ul>';
			container.innerHTML = html;
		}
  	});
}

function stripAndTruncate(string) {
	if (string == null) return null;

        // Make sure to take out the posted by headers if they are there
        var noposted = string.replace(/^<span.*>Posted by .*?<\/span>/i, '');

	var snip = noposted.replace(/<\/?[^>]+>/gi, '');
	if (snip.length > 300) {
		snip = snip.substring(0, 290) + '...';
	}
	return snip;
}

