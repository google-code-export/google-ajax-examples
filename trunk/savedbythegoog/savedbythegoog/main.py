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
import hashlib
import wsgiref.handlers
import logging

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.api import memcache
from google.appengine.api import urlfetch

def saveCode(code):
  # IE won't let an HTML input element store newline chars,
  # so we change them to &#x000a; for the input element, then on the
  # serverside change them back to actual newlines.
  code = code.replace('&#x000a;', '\n')
  h = hashlib.sha1()
  h.update(code)
  key = h.hexdigest()
  # Keep the code around for half an hour or until memory pressure causes
  # it to be removed from the cache.
  memcache.set(key=key, value=code, time=600)
  logging.info("Saving to memcache with key: " + key)
  return key

class AddCode(webapp.RequestHandler):
  def post(self):
    code = self.request.get('code')
    ip = self.request.remote_addr;
    data = memcache.get(ip)
    if data is not None:
      self.response.out.write('Rate limited.')
    else:
      # Store that this IP added code in the last 10 seconds
      memcache.set(key=ip, value="1", time=10)
      code = code.replace('&#x000a;', '\n');
      if (code):
        key = saveCode(code)
        self.redirect('/?id=' + str(key))
      else:
        self.response.out.write('Must submit code.')

class CacheCode(webapp.RequestHandler):
  def post(self):
    code = self.request.get('code')
    key = saveCode(code)
    self.response.out.write(str(key))

class RetrieveCache(webapp.RequestHandler):
  def get(self):
    unique_id = self.request.get('unique_id')
    defaultSample = self.request.get('defaultSample')
    self.response.headers['P3P'] = 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"'
    code = memcache.get(unique_id)
    if code:
      # Cache HIT

      # Refresh the cache, commonly used code snippets shouldn't expire as
      # quickly as infrequently used ones.
      memcache.set(key=unique_id, value=code, time=600)
      self.response.out.write(code)
    elif defaultSample:
      # Cache MISS, doing HTTP request
      self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
      self.response.headers['Content-Type'] = 'text/html'
      self.response.headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate'
      uniqueSplit = unique_id.split('|')
      bpUrl = uniqueSplit[0]
      jsUrl = uniqueSplit[1]
      bpData = urlfetch.fetch(bpUrl, "GET").content
      jsData = urlfetch.fetch(jsUrl, "GET").content
      bpData = bpData.replace('INSERT_JAVASCRIPT_HERE', jsData)

      # Do we want this?
      h = hashlib.sha1()
      h.update(bpData)
      alt_key = h.hexdigest()
      memcache.set(key=alt_key, value=bpData, time=600)      

      memcache.set(key=unique_id, value=bpData, time=600)
      self.response.out.write(bpData)
    else:
      # Cache MISS, epic fail
      self.response.set_status(404)
      self.response.out.write('Expired or non-existent.')

class ShowCode(webapp.RequestHandler):
  def get(self):
    key = self.request.get('id')
    if key:
      code = memcache.get(key)
      if code:
        # Cache HIT
        self.response.out.write(code)
      else:
        # Cache MISS, epic fail
        self.response.set_status(404)
        self.response.out.write('Expired or non-existent.')
    else:
      # Bad Request
      self.response.set_status(400)
      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('Must supply code ID')

def main():
  application = webapp.WSGIApplication([
    ('/add', AddCode),
    ('/', ShowCode),
    ('/cache_code', CacheCode),
    ('/retrieve_cache', RetrieveCache),
    ('/show', ShowCode)
  ],debug=False)                        
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
