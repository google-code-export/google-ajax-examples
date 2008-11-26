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


from google.appengine.ext import webapp
from google.appengine.api import users
from google.appengine.ext import db

# GLOBAL ARRAY OF APIS & THEIR CONFIGURED JSON FILES.  DON'T EDIT UNLESS YOU'RE SURE
apis = {
  'search': 'samples/search_api_samples.js',
  'lang': 'samples/lang_api_samples.js',
  'feeds': 'samples/feeds_api_samples.js',
  'libs': 'samples/libs_api_samples.js'
}

class SavedCode(db.Model):
  jscode = db.TextProperty()
  user = db.UserProperty()
  sampleName = db.StringProperty()
  boilerplateLoc = db.StringProperty()
  tags = db.StringProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  # {'samplename': 'blah', 'tags': 'all my tags', 'boilerplateLoc': 'path/to/boiler', 'files': ['path/to/?id=id']}
  
def getTemplateValues(self):
  user = users.get_current_user()
  greeting = ''
  logoutUrl = ''
  loginUrl = ''
  if user:
    greeting = '%s' % (user.nickname())
    logoutUrl = users.create_logout_url('/')
  else:
    loginUrl = users.create_login_url('/')
  
  template_values = {
    'loginUrl': loginUrl,
    'greeting': greeting,
    'logoutUrl': logoutUrl
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

def retrieveCodeFromID(self, id):
  # get code from the ID and return it
  return code


class GetCode(webapp.RequestHandler):
  def get(self):
    id = self.request.get('id')
    entry = db.get(db.Key(str(id)))
    self.response.out.write(entry.jscode);

class Main(webapp.RequestHandler):
  def getAPISampleSourceIncludes(self, types):
    apiSampleSources = []
    if types:
      types = types.split('|')
      for i in types:
        apiSampleSources.append(apis[i])
    else:
      for i in apis:
        apiSampleSources.append(apis[i])
    
    return apiSampleSources
        
  
  def get(self):
    self.template_values = getTemplateValues(self);
    # self.response.out.write(simplejson.dumps(a))
    if users.get_current_user():
      # savedCode is an array of code entries..
      savedCode = grabSavedCode(self)
      savedCodeArr = []
      if savedCode:
        for i in savedCode:
          savedCodeArr.append({
            'files': ['/get?id=' + str(i.key())],
            'sampleName': i.sampleName,
            'boilerplateLoc': i.boilerplateLoc,
            'tags': i.tags,
            'id': str(i.key())
            })
      
        savedCodeObj = [
          {
            'category': 'Saved Code',
            'samples': savedCodeArr
          }
        ]
        self.template_values['usersSamplesJSON'] = simplejson.dumps(savedCodeObj);
        
    apiTypes = self.request.get('type')
    if apiTypes:
      sample_srcs = self.getAPISampleSourceIncludes(apiTypes)
      self.template_values['sample_srcs'] = sample_srcs
      self.template_values['curAPITypes'] = apiTypes

    path = os.path.join(os.path.dirname(__file__), 'index.html')
    self.response.out.write(template.render(path, self.template_values))


class Delete(webapp.RequestHandler):
  def get(self):
    self.template_values = getTemplateValues(self)
    
    id = self.request.get('id')
    entry = db.get(db.Key(str(id)))
    user = users.get_current_user()
    if entry.user == user:
      # we can delete it then..
      self.template_values['deleted'] = entry.sampleName
      db.delete(entry)
    
    apiTypes = self.request.get('type')
    if apiTypes:
      cgiArgs = '?type=' + apiTypes
    self.redirect('/' + cgiArgs)
        # 
        # path = os.path.join(os.path.dirname(__file__), 'index.html')
        # self.response.out.write(template.render(path, self.template_values))

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
    
  def updateCode(self, id, jscode):
    entry = db.get(db.Key(str(id)))
    user = users.get_current_user()
    if entry.user == user:
      entry.jscode = jscode
      entry.put()
      hashLink = '#' + entry.sampleName.lower().replace(' ', '_')
      return hashLink
  
  def post(self):
    user = users.get_current_user()
    hashLink = ''
    self.template_values = getTemplateValues(self)
    if user:
      id = self.request.get('id')
      jscode = self.request.get('jscode')
      sampleName =  self.request.get('sampleName')
      tags = self.request.get('tags')
      boilerplateLoc = self.request.get('boilerplateLoc')
      if id and jscode:
        hashLink = self.updateCode(id, jscode)
      elif jscode and sampleName and boilerplateLoc:
        hashLink = self.saveCode(user, jscode, sampleName, tags, boilerplateLoc)
        
        # path = os.path.join(os.path.dirname(__file__), 'index.html')
        # self.response.out.write(template.render(path, self.template_values))
      else:
        self.response.out.write('Error.')
      
    else:
      self.response.out.write('Not logged in')
      
    apiTypes = self.request.get('type')
    if apiTypes:
      cgiArgs = '?type=' + apiTypes
    self.redirect('/' + cgiArgs + hashLink)

def main():
  application = webapp.WSGIApplication([('/', Main),
                                        ('/save', Save),
                                        ('/delete', Delete),
                                        ('/get', GetCode)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
