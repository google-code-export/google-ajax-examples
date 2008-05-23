# Copyright (c) 2008 Google Inc.
  
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import cgi
import gminifb
import simplejson
import urllib
import wsgiref.handlers

from google.appengine.api import urlfetch
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template

_FbApiKey = 'APIKEYGOESHERE'
_FbSecret = 'APISECRETGOESHERE'

class Attachment(webapp.RequestHandler):
  
  def post(self):
    arguments = gminifb.validate(_FbSecret, self.request)
    session_key = arguments["session_key"]
    uid = arguments["user"]

    debug = self.request.get('message')

    translated_message = ''
    message = 'Write a message in your language...'
    language = self.request.get('language', 'en')
    
    if self.request.get('message'):
      message = self.request.get('message')
      message = message.replace("\\\\", "\\")
      message = message.replace("\\\'", "\'")
      message = message.replace("\\\"", "\"")
      message = cgi.escape(message)
      translated_message = translate(message, language)
      
    message_sent = self.request.get('message_sent')  
    if not message_sent or int(message_sent) < 1:
      params = {
        'message' : message,
        'language_list': LANGUAGE_LIST,
        'selected_language' : language,
        'translated_message' : translated_message
      }
      self.response.out.write(template.render('canvas.fbml', params))
    else:
      self.response.out.write(translated_message)

def translate(s, lang):
  params = {
    'v' : '1.0',
    'q' : s,
    'langpair' : '|%s' % lang
  }
  response = urlfetch.fetch('http://ajax.googleapis.com/ajax/'
    'services/language/translate?%s' % urllib.urlencode(params),
    headers = {'Referer' : 'http://ajaxapisample.appspot.com/'})
  
  data = simplejson.loads(response.content)
  
  if data['responseStatus'] != 200:
    return 'Error translating message.'
  else:
    return ('%s <br/><br/> %s' % 
      (data['responseData']['translatedText'], TRANSLATED_BY_GOOGLE))

LANGUAGE_LIST = [
  {
    'value' : 'en',
    'label' : 'English'
  },
  {
    'value' : 'es',
    'label' : 'Spanish'
  },
  {
    'value' : 'de',
    'label' : 'German'
  },
  {
    'value' : 'fr',
    'label' : 'French'
  },
  {
    'value' : 'ru',
    'label' : 'Russian'
  },
  {
    'value' : 'it',
    'label' : 'Italian'
  },
  {
    'value' : 'ja',
    'label' : 'Japanese'
  },
  {
    'value' : 'pt-PT',
    'label' : 'Portuguese'
  }
]

TRANSLATED_BY_GOOGLE = ('<table><tr valign="middle"><td><small><b>'
  'Machine translated by </b></small></td><td>'
  '<img src="http://www.google.com/uds/css/small-logo.png" alt="Google">'
  '</td></tr></table>')

def main():
  application = webapp.WSGIApplication(
                                       [('/', Attachment)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()