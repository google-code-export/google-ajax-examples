#!/usr/bin/python2.5
#
# Copyright 2011 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Simple App Engine app for detecting duplicate iframe requests.

To use, write a test web application which uses iframes pointing to
this app. To give additional context about what was happening on the page
when the iframe was requested, send requests to the /log URL. The time
of the request is recorded in the App Engine app's log so that the sequence
of events can be recreated.

To see duplicate requests or examine request history, look in the AppEngine
logs for the app. The requests are logged at the info level while duplicates
are logged at the error level. Look at "All requests" to see both easily.

You could also look in the AppEngine Datastore Viewer. Here are some example
queries:

select * from LoggedRequest order by received desc
select * from LoggedRequest where duplicate = true order by received desc
select * from LoggedRequest where url = 'http://...'

  LoggedRequest: Record of an iframe or log request stored in the datastore.
  RequestLogger: Request handler responsible for recording the URL.
"""

import datetime
import logging
import os
import random
import time

from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

__author__ = 'j.s@google.com (Jeff Scudder)'


class LoggedRequest(db.Model):
  url = db.StringProperty()
  duplicate = db.BooleanProperty()
  received = db.DateTimeProperty(auto_now_add=True)


class RequestLogger(webapp.RequestHandler):
  def LogParams(self):
    to_log = LoggedRequest(url=self.request.url, duplicate=False)
    # Lookup before inserting to see if this is a dup.
    match = LoggedRequest.all().filter('url =', self.request.url).fetch(1)
    if match:
      to_log.duplicate = True
      logging.error('Duplicate request: %s', self.request.url)

    to_log.put()

  def SetResponseHeaders(self, prefix):
    cache_control = self.request.get(prefix + 'cache-control')
    pragma = self.request.get(prefix + 'pragma')
    expires = self.request.get(prefix + 'expires')
    if expires == 'now':
      t = datetime.datetime.now()
      todayFormatted = datetime.datetime.fromtimestamp(
          time.mktime(t.timetuple())).strftime("%a, %d %b %Y %I:%M:%S")
      expires = todayFormatted + ' GMT'

    logging.error('Cache control is ' + cache_control)

    if cache_control:
      self.response.headers['Cache-Control'] = cache_control

    if pragma:
      self.response.headers['Pragma'] = pragma

    if expires:
      self.response.headers['Expires'] = expires


class LogEvent(RequestLogger):
  def get(self):
    self.LogParams()
    self.SetResponseHeaders('')
    self.response.headers['Content-Type'] = 'image/gif'
    self.response.set_status(204)


class LibServer(RequestLogger):
  def get(self):
    template_values = {
        'host': self.request.host
    }
    self.SetResponseHeaders('')
    self.response.headers['Content-Type'] = 'text/javascript'
    path = os.path.join(os.path.dirname(__file__), 'lib.js')
    self.response.out.write(template.render(path, template_values))


class FrameServer(RequestLogger):
  def get(self):
    self.LogParams()
    self.SetResponseHeaders('iframe-')
    self.response.headers['Content-Type'] = 'text/html'
    timestamp = self.request.get('t')
    self.response.out.write(
        '<html><body>iframe timestamp: %s id: %d</body></html>' % (
            timestamp, random.randint(0, 500000)))


class DemoServer(RequestLogger):
  def get(self):
    template_values = {
        'host': self.request.host
    }
    self.SetResponseHeaders('')
    self.response.headers['Content-Type'] = 'text/html'
    path = os.path.join(os.path.dirname(__file__), 'demo.html')
    self.response.out.write(template.render(path, template_values))


application = webapp.WSGIApplication([('/iframes/iframe.*', FrameServer),
                                      ('/iframes/log', LogEvent),
                                      ('/iframes/lib.js', LibServer),
                                      ('/iframes/demo.*', DemoServer)],
                                     debug=True)


def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()
