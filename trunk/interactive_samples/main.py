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



import os
import cgi
import wsgiref.handlers
from google.appengine.ext.webapp import template
import simplejson
import functools
import Cookie
import datetime
import time
import urllib
from google.appengine.api import memcache

from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.api import urlfetch

# GLOBAL ARRAY OF APIS & THEIR CONFIGURED JSON FILES.  DON'T EDIT UNLESS YOU'RE SURE
apis = {
  'search': 'samples/TOC/search_api_samples.js',
  'language': 'samples/TOC/lang_api_samples.js',
  'feeds': 'samples/TOC/feeds_api_samples.js',
  'libraries': 'samples/TOC/libs_api_samples.js',
  'earth': 'samples/TOC/earth_api_samples.js',
  'maps': 'samples/TOC/maps_api_samples.js',
  'visualization': 'samples/TOC/visualization_api_samples.js',
  'blogger': 'samples/TOC/blogger_api_samples.js',
  'calendar': 'samples/TOC/calendar_api_samples.js',
  'youtube': 'samples/TOC/youtube_api_samples.js',
  'friendconnect' : 'samples/TOC/friendconnect_api_samples.js'
}

class SavedCode(db.Model):
  jscode = db.TextProperty()
  user = db.UserProperty()
  sampleName = db.StringProperty()
  boilerplateLoc = db.StringProperty()
  tags = db.StringProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  # {'samplename': 'blah', 'tags': 'all my tags', 'boilerplateLoc': 'path/to/boiler', 'files': ['path/to/?id=id']}

def getTemplateValues(self, cgiArgs):
  user = users.get_current_user()
  greeting = ''
  logoutUrl = ''
  loginUrl = ''
  email = ''
  isOnGoogleCode = self.request.path.find('apis/ajax/playground')
  if cgiArgs != '':
    cgiArgs = '?' + cgiArgs
  if user:
    greeting = '%s' % (user.nickname())
    email = user.email()
    if isOnGoogleCode != -1:
      logoutUrl = users.create_logout_url('/apis/ajax/playground/' + cgiArgs)
    else:
      logoutUrl = users.create_logout_url('/' + cgiArgs)
  else:
    if isOnGoogleCode != -1:
      loginUrl = users.create_login_url('/apis/ajax/playground/' + cgiArgs)
    else:
      loginUrl = users.create_login_url('/' + cgiArgs)
  template_values = {
    'loginUrl': loginUrl,
    'greeting': greeting,
    'logoutUrl': logoutUrl,
    'userEmail': email
  }
  return template_values

def grabSavedCode(self):
  # get all entries associated with the user and return them as an array
  codeEntries = db.GqlQuery('SELECT * FROM SavedCode WHERE user = :1',
                             users.get_current_user())
  codeEntries = codeEntries.fetch(100)
  if len(codeEntries) > 0:
    return codeEntries
  else:
    return None

def formatSavedCodeToJSONArr(self, savedCodeArr):
  # format the array into an array of JSON entries that conforms to the
  # ajax_apis_samples.js format

  return simplejson.dumps(savedCodeArr)

def verify_xsrf_token(method):
  """Written and stolen from Doug Coker.  Thanks Doug :)
  Asserts that the request is acceptable per XSRF tests.  If the token is
  not valid, we send a 500.  If it is valid, the wrapped method can assume the
  request is legitimate.

  Why: Proper web practice dictates that mutation only occur via POST requests.
  However, I'm lazy, and dealing with POST requires more lines of code and more
  complex javascript than using GETs.

  How: The XSRF token allows us to permit mutation via GET requests because the
  presence of the token indicates a request from a trusted source.  We know the
  source is trusted because the token is derived from a cookie which is only
  known to pages on our domain.  This prevents third party pages from creating
  links to actions on our site that mutate data.

  For more information, see
  http://en.wikipedia.org/wiki/Cross-site_request_forgery
  """
  @functools.wraps(method)
  def wrapper(self, *args, **kwargs):
    c = Cookie.SimpleCookie()
    c.load(self.request.headers['Cookie'])
    if c.has_key("ACSID"):
      cookieVal = "safe" + c["ACSID"].value[6:20]
    if c.has_key("dev_appserver_login"):
      cookieVal = "safe" + c["dev_appserver_login"].value[6:20]
    if cookieVal and cookieVal == self.request.get('sc'):
      return method(self, *args, **kwargs)
    else:
      self.error(500)
      self.response.out.write("Unauthorized.");
      return
  return wrapper

class GetCode(webapp.RequestHandler):
  @verify_xsrf_token
  def get(self):
    id = self.request.get('id')
    entry = db.get(db.Key(str(id)))
    self.response.headers['Content-Disposition'] = "attachment header"
    self.response.headers['Content-Type'] = "application/json; charset=utf-8"
    self.response.headers['X-Content-Type-Options'] = 'nosniff'
    if (entry.user == users.get_current_user()):
      self.response.out.write(entry.jscode)
    else:
      self.response.out.write('')

def getTypes(self):
  types = self.request.get('type')
  splitTypes = types.split('|')
  for i in splitTypes:
    if not apis.has_key(i):
      return False
  return types

def getExpanded(self):
  expanded = self.request.get('exp')
  if not apis.has_key(expanded):
    return False
  return expanded

class Main(webapp.RequestHandler):
  def getAPISampleSourceIncludes(self, types):
    apiSampleSources = []
    if types:
      types = types.split('|')
      for i in types:
        apiSampleSources.append(apis[i])
    else:
      theApis = sorted(apis.keys())
      for i in range(0, len(theApis) - 1):
        if theApis[i] == 'language':
          apiSampleSources.insert(0, apis[theApis[i]])
        else:
          apiSampleSources.append(apis[theApis[i]])

    return apiSampleSources


  def get(self):
    apiTypes = getTypes(self)
    expanded = getExpanded(self)
    cgiArgsDict = {}
    self.template_values = {}

    # these next couple lines of code are stupid because of laziness.
    if apiTypes:
      cgiArgsDict["type"] = apiTypes
    if expanded:
      cgiArgsDict["exp"] = expanded
    cgiArgs = urllib.urlencode(cgiArgsDict)
    self.template_values = getTemplateValues(self, cgiArgs);
    if apiTypes:
      self.template_values['curAPITypes'] = apiTypes
    if expanded:
      self.template_values['expandedCategory'] = expanded

    # sample_srcs = self.getAPISampleSourceIncludes(apiTypes)
    if apiTypes:
      apiTypes = '?type=' + apiTypes
    else:
      apiTypes = ''
    sample_srcs = ['/apis/ajax/playground/getTOC' + apiTypes]
    self.template_values['sample_srcs'] = sample_srcs
    # self.response.out.write(simplejson.dumps(a))
    if users.get_current_user():
      # savedCode is an array of code entries..
      savedCode = grabSavedCode(self)
      savedCodeArr = []
      if savedCode:
        for i in savedCode:
          savedCodeArr.append({
            'files': ['get?id=' + str(i.key())],
            'sampleName': cgi.escape(i.sampleName),
            'boilerplateLoc': i.boilerplateLoc,
            'tags': cgi.escape(i.tags),
            'id': str(i.key())
            })

        savedCodeObj = [
          {
            'category': 'Saved Code',
            'samples': savedCodeArr
          }
        ]
        self.template_values['usersSamplesJSON'] = simplejson.dumps(savedCodeObj);

    t = datetime.datetime.now()
    todayInSeconds = time.mktime(t.timetuple())
#    tomorrowInSeconds =  todayInSeconds + 86400
#    tomorrowFormatted = datetime.datetime.fromtimestamp(tomorrowInSeconds)
    todayFormatted = datetime.datetime.fromtimestamp(todayInSeconds)
#    tomorrowFormatted = tomorrowFormatted.strftime("%a, %d %b %Y %I:%M:%S")
    todayFormatted = todayFormatted.strftime("%a, %d %b %Y %I:%M:%S")

    # self.response.headers['Expires'] = todayFormatted + ' GMT'
    self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"

    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, self.template_values))


class Delete(webapp.RequestHandler):
  @verify_xsrf_token
  def get(self):
    id = self.request.get('id')
    entry = db.get(db.Key(str(id)))
    user = users.get_current_user()
    if entry.user == user:
      # we can delete it then..
      db.delete(entry)

    apiTypes = getTypes(self)
    cgiArgs = ''
    if apiTypes:
      cgiArgs = '?type=' + apiTypes

    isOnGoogleCode = self.request.path.find('apis/ajax/playground')
    if isOnGoogleCode != -1:
      self.redirect('/apis/ajax/playground/' + cgiArgs)
    else:
      self.redirect('/' + cgiArgs)
        #
        # path = os.path.join(os.path.dirname(__file__), 'index.html')
        # self.response.out.write(template.render(path, self.template_values))

class RedirectToMain(webapp.RequestHandler):
  def get(self):
    self.redirect('/apis/ajax/playground/')

class Save(webapp.RequestHandler):
  def saveCode(self, user, jscode, sampleName, tags, boilerplateLoc):
    saved_code = SavedCode()
    saved_code.user = user
    saved_code.sampleName = sampleName
    saved_code.tags = tags
    saved_code.boilerplateLoc = boilerplateLoc
    saved_code.jscode = jscode
    key = saved_code.put()
    hashLink = '#' + sampleName.lower().replace(' ', '_')
    return hashLink

  def updateCode(self, id, jscode, boilerplateLoc):
    entry = db.get(db.Key(str(id)))
    user = users.get_current_user()
    if entry.user == user:
      entry.jscode = jscode
      entry.boilerplateLoc = boilerplateLoc
      entry.put()
      hashLink = '#' + entry.sampleName.lower().replace(' ', '_')
      return hashLink

  @verify_xsrf_token
  def post(self):
    user = users.get_current_user()
    hashLink = ''
    if user:
      id = self.request.get('id')
      jscode = self.request.get('jscode')
      #  This hack is because of IE not being able to POST the code with the
      #  newline characters in it
      jscode = jscode.replace('NEWLINE!!!', '\n');
      sampleName =  self.request.get('sampleName')
      tags = self.request.get('tags')
      boilerplateLoc = self.request.get('boilerplateLoc')
      if id and jscode:
        hashLink = self.updateCode(id, jscode, boilerplateLoc)
      elif jscode and sampleName:
        hashLink = self.saveCode(user, jscode, sampleName, tags, boilerplateLoc)

        # path = os.path.join(os.path.dirname(__file__), 'index.html')
        # self.response.out.write(template.render(path, self.template_values))
      else:
        self.response.out.write('Error.')

    else:
      self.response.out.write('Not logged in')

    apiTypes = getTypes(self)
    cgiArgs = ''
    if apiTypes:
      cgiArgs = '?type=' + apiTypes

    
    isOnGoogleCode = self.request.path.find('apis/ajax/playground')
    if isOnGoogleCode != -1:
      self.redirect('/apis/ajax/playground/' + cgiArgs + hashLink)
    else:
      self.redirect('/' + cgiArgs + hashLink)
      
class CacheCode(webapp.RequestHandler):
  def post(self):
    code = self.request.get('code')
    unique_id = self.request.get('unique_id')
    code = code.encode('utf-8')
    query = urllib.urlencode({'code' : code, 'unique_id' : unique_id})
    data = urlfetch.fetch('http://savedbythegoog.appspot.com/cache_code', query, "POST")
    self.response.out.write(data.content)

class GetTOC(webapp.RequestHandler):
  def getAllTOCs(self):
    the_response_script = ''
    theApis = sorted(apis.keys())
    for i in range(0, len(theApis) - 1):
      the_file = open(apis[theApis[i]])
      if theApis[i] == 'language':
        the_response_script = the_file.read() + '\n' + the_response_script
      else:
        the_response_script += "\n" + the_file.read()
      the_file.close()
    return the_response_script
  def getTOCsByType(self, types):
    the_response_script = ''
    splitTypes = types.split('|')
    for i in splitTypes:
      if apis.has_key(i):
        the_file = open(apis[i])
        the_response_script += "\n" + the_file.read()
        the_file.close()
    return the_response_script

  def get(self):
    types = self.request.get('type')
    
    if not types:
      types = 'all'
    TOC = memcache.get('TOC:' + types)
    the_response_script = ""
    if TOC:
      the_response_script = TOC
    else:
      # We don't have it in memcache, we need to grab the files and put them in memcache
      if types == 'all':
        # just grab all
        the_response_script = self.getAllTOCs()
      else:
        # grab only what we need    
        the_response_script = self.getTOCsByType(types)
        if the_response_script == '':
          the_response_script = self.getAllTOCs()
      memcache.set('TOC:' + types, the_response_script, 600)
    self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
    self.response.headers['content-type'] = 'text/javascript'
    self.response.headers['cache-control'] = 'no-cache, no-store, max-age=0, must-revalidate'
    self.response.out.write(the_response_script)
    
            # 
            #     
            #     
            # if not types:
            #   allTOC = memcache.get('TOC:all')
            #   # memcache.delete('TOC:all')
            #   if allTOC:
            #     self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
            #     self.response.headers['content-type'] = 'application/javascript'
            #     self.response.out.write('// 1\n')
            #     self.response.out.write(allTOC)
            #   else:  
            #     the_response_script = ""
            #     
            #     theApis = sorted(apis.keys())
            #     for i in range(0, len(theApis) - 1):
            #       the_file = open(apis[theApis[i]])
            #       
            #       if theApis[i] == 'language':
            #         the_response_script = the_file.read() + '\n' + the_response_script
            #       else:
            #         the_response_script += "\n" + the_file.read()
            #       the_file.close()
            #       
            #     memcache.set('TOC:all', the_response_script)
            #     self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
            #     self.response.headers['content-type'] = 'application/javascript'
            #     self.response.out.write('// 2\n')
            #     self.response.out.write(the_response_script)
            # else:
            #   TOC = memcache.get('TOC:' + types)
            #   if (TOC):
            #     self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
            #     self.response.headers['content-type'] = 'application/javascript'
            #     self.response.out.write('// 11\n')
            #     self.response.out.write(TOC)
            #   else:
            #     the_response_script = ""
            #     splitTypes = types.split('|')
            # 
            #     for i in splitTypes:
            #       if apis.has_key(i):
            #         the_file = open(apis[i])
            #         the_response_script += "\n" + the_file.read()
            #         the_file.close()
            #     memcache.set('TOC:' + types, the_response_script)
            #     self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
            #     self.response.headers['content-type'] = 'application/javascript'
            #     self.response.out.write('// 22' + types + '\n')
            #     self.response.out.write(the_response_script)
        
def main():
  application = webapp.WSGIApplication([('/', Main),
                                        ('/save', Save),
                                        ('/delete', Delete),
                                        ('/get', GetCode),
                                        ('/cacheCode', CacheCode),
                                        ('/apis/ajax/playground/', Main),
                                        ('/apis/ajax/playground', RedirectToMain),
                                        ('/apis/ajax/playground/save', Save),
                                        ('/apis/ajax/playground/delete', Delete),
                                        ('/apis/ajax/playground/get', GetCode),
                                        ('/apis/ajax/playground/cacheCode', CacheCode),
                                        ('/apis/ajax/playground/getTOC', GetTOC)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
