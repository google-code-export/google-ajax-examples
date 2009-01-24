#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#




__author__ = 'lisbakke@google.com (Ben Lisbakken)'

import os
import cgi
import wsgiref.handlers

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.api import memcache

class SavedCode(db.Model):
  code = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)

class AddCode(webapp.RequestHandler):
  def saveCode(self, code):
    # Max in database must be found, then my ID is that +1
    saved_code = SavedCode()
    saved_code.code = code
    key = saved_code.put()
    return key
  
  def post(self):
    code = self.request.get('code')
    ip = self.request.remote_addr;
    data = memcache.get(ip)
    if data is not None:
      self.response.out.write('Rate limited.')
    else:
      # Store that this IP added code in the last 10 seconds
      memcache.add(key = ip, value = "1", time = 10)
      # Super hack :D IE won't let an HTML input element store newline chars, so I
      # change them to NEWLINE!!! for the input element, then on the serverside
      # change them back to actual newlines.  It's high tech.
      code = code.replace('NEWLINE!!!', '\n');
      if (code):
        key = self.saveCode(code)
        self.response.out.write('<script>window.location = "http://savedbythegoog.appspot.com/?id=' + str(key) + '";</script>')
      else:
        self.response.out.write('Must submit code.')

class ShowCode(webapp.RequestHandler):
  def get(self):
    key = self.request.get('id')
    if (key):
      saved_code = db.get(db.Key(str(key)))
      self.response.out.write(saved_code.code)
    else:
      self.response.out.write('Must supply code ID')

def main():
  application = webapp.WSGIApplication([
    ('/add', AddCode),
    ('/', ShowCode),
    ('/show', ShowCode)
  ],debug=False)                        
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
