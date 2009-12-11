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

def retrieveCode(key):
  """Checks memcached for the key first, then checks the data store."""
  code = memcache.get(key)
  if not code:
    saved_code = SavedCode.get_by_key_name(key)
    code = saved_code and saved_code.code
  return code

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
    unique_id = self.request.get('unique_id') or self.request.get('id')
    default_sample = self.request.get('defaultSample')
    last_key = self.request.cookies.get('lastKey')
    self.response.headers['P3P'] = 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"'
    key = None
    code = None
    # If a unique ID was sent via the URI, check memcache and the datastore
    # for matching code, otherwise, if there is a lastKey cookie value,
    # check memcache and the datastore for that instead.
    if unique_id:
      code = retrieveCode(unique_id)
      if code:
        key = unique_id
        logging.info('ID supplied by URI');
    if not unique_id and not default_sample and last_key:
      code = retrieveCode(last_key)
      if code:
        key = last_key
        logging.info('ID supplied by cookie');
    if code:
      # Cache HIT

      # Refresh the cache, commonly used code snippets shouldn't expire as
      # quickly as infrequently used ones.
      memcache.set(key=key, value=code, time=600)
      logging.info('Memcache hit: %s' % key)
      self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
      self.response.headers['Content-Type'] = 'text/html'
      self.response.headers['Cache-Control'] = \
        'no-cache, no-store, max-age=0, must-revalidate'
      self.response.headers['Set-Cookie'] = str('lastKey=%s; path=/' % key)
      self.response.out.write(code)
    elif default_sample:
      # Cache MISS, but it was a default sample, so retrieve and rebuild
      # the code from its component parts.
      unique_split = unique_id.split('|')
      bp_url = unique_split[0]
      js_url = unique_split[1]
      bp_data = urlfetch.fetch(bp_url, "GET").content
      js_data = urlfetch.fetch(js_url, "GET").content
      bp_data = bp_data.replace('INSERT_JAVASCRIPT_HERE', js_data)

      h = hashlib.sha1()
      h.update(bp_data)
      key = h.hexdigest()

      self.response.headers['Set-Cookie'] = str('lastKey=%s; path=/' % key)
      memcache.set(key=key, value=bp_data, time=600)
      
      # This is a crude hack to avoid subsequent rebuilds.  Essentially, we
      # make a second entry in the cache under the key used for this
      # request, rather than only under the content hash.
      memcache.set(key=unique_id, value=bp_data, time=600)
      
      logging.info('Default sample cached.  Redirecting.');
      self.redirect('/retrieve_cache?unique_id=' + str(key))
    elif not unique_id:
      # Bad Request
      self.response.set_status(400)
      self.response.headers['Content-Type'] = 'text/plain'
      self.response.out.write('Must supply code ID')
    else:
      # Cache MISS, epic fail
      self.response.set_status(404)
      self.response.out.write('Expired or non-existent.')

def main():
  application = webapp.WSGIApplication([
    ('/add', AddCode),
    ('/', RetrieveCache),
    ('/cache_code', CacheCode),
    ('/retrieve_cache', RetrieveCache),
    ('/show', RetrieveCache)
  ],debug=False)                        
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()
