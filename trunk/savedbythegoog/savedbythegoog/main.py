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

class SavedCode(db.Model):
  code = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)

def saveCode(code):
  # IE won't let an HTML input element store newline chars,
  # so we change them to &#x000a; for the input element, then on the
  # serverside change them back to actual newlines.
  code = code.replace('&#x000a;', '\n')
  h = hashlib.sha1()
  h.update(code)
  key = h.hexdigest()
  saved_code = SavedCode(key_name=key)
  saved_code.code = code
  saved_code.put()
  logging.info("Saving to datastore with key: " + key)
  return key

def cacheCode(code):
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
      if code.strip():
        key = saveCode(code)
        self.redirect('/?id=' + str(key))
      else:
        self.response.out.write('Must submit code.')

class CacheCode(webapp.RequestHandler):
  def post(self):
    code = self.request.get('code')
    key = cacheCode(code)
    self.response.out.write(str(key))

class RetrieveCache(webapp.RequestHandler):
  def get(self):
    unique_id = self.request.get('unique_id')
    default_sample = self.request.get('defaultSample')
    last_key = self.request.cookies.get('lastKey')
    self.response.headers['P3P'] = 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"'
    code = memcache.get(unique_id)
    if code:
      logging.info('From passed id memcache');
    if not code and not default_sample and last_key:
      logging.info('From cookie id memcache');
      code = memcache.get(last_key)
    if code:
      # Cache HIT

      # Refresh the cache, commonly used code snippets shouldn't expire as
      # quickly as infrequently used ones.
      memcache.set(key=unique_id, value=code, time=600)
      self.response.headers['Set-Cookie'] = str('lastKey=%s; path=/' % (unique_id or last_key))
      self.response.out.write(code)
    elif default_sample:
      # Cache MISS, doing HTTP request
      unique_split = unique_id.split('|')
      bp_url = unique_split[0]
      js_url = unique_split[1]
      bp_data = urlfetch.fetch(bp_url, "GET").content
      js_data = urlfetch.fetch(js_url, "GET").content
      bp_data = bp_data.replace('INSERT_JAVASCRIPT_HERE', js_data)

      # Do we want this?
      h = hashlib.sha1()
      h.update(bp_data)
      alt_key = h.hexdigest()

      self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
      self.response.headers['Content-Type'] = 'text/html'
      self.response.headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate'
      self.response.headers['Set-Cookie'] = str('lastKey=%s; path=/' % alt_key)
      memcache.set(key=alt_key, value=bp_data, time=600)
      memcache.set(key=unique_id, value=bp_data, time=600)
      logging.info('From default_sample');
      self.response.out.write(bp_data)
    else:
      # Cache MISS, epic fail
      self.response.set_status(404)
      self.response.out.write('Expired or non-existent.')

class ShowCode(webapp.RequestHandler):
  def get(self):
    key = self.request.get('id')
    last_key = self.request.cookies.get('lastKey')
    code = None
    if key or last_key:
      code = memcache.get(key or last_key)
    if key or last_key and not code:
      saved_code = SavedCode.get_by_key_name(key or last_key)
      logging.info('From datastore');
      code = saved_code and saved_code.code
    if code:
      # Cache HIT
      self.response.headers['Set-Cookie'] = str('lastKey=%s; path=/' % key)
      self.response.out.write(code)
    elif key:
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
