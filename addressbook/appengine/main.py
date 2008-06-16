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

import datetime
import logging
import os
import wsgiref.handlers

from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp import template

import datamodel

# Handle /
class MainHandler(webapp.RequestHandler):
  def get(self):
    template_path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.headers['Content-Type'] = 'text/html'
    self.response.out.write(template.render(template_path, {}))    


# Handle /loadcontacts
class LoadContactsHandler(webapp.RequestHandler):
  def get(self):
    template_data = { 'contacts': datamodel.Contact.all() }
    
    template_path = os.path.join(os.path.dirname(__file__), 'contacts.js')
    self.response.headers['Content-Type'] = 'text/javascript'
    self.response.out.write(template.render(template_path, template_data))

    
# Handle /savecontact
class SaveContactHandler(webapp.RequestHandler):
  def post(self):
    new = datamodel.Contact(id = int(self.request.get('id')))
    new.name = self.request.get('name')
    new.email = self.request.get('email')
    new.phone = self.request.get('phone')
    new.street = self.request.get('street')
    new.city = self.request.get('city')
    new.state = self.request.get('state')
    new.zip = self.request.get('zip')
    new.timestamp = datetime.datetime.now()
    
    new.put()


# Handle /loaddummy
class LoadDummyHandler(webapp.RequestHandler):
  def get(self):    
    # delete everything first
    contacts = datamodel.Contact.all()
    for contact in contacts:
      contact.delete()
    
    # insert data
    d1 = datamodel.Contact(id = 1, name = 'Dion Gary Almaer', email = 'dion@gmail.com', phone = '223 123 9949', street = '203 Boston Common', city = 'Cambridge', state = 'MA', zip = '00122', timestamp = datetime.datetime(2007, 3, 22) )
    d1.put()

    datamodel.Contact(id = 1, name = 'Dion Almaer', email = 'dion@almaer.com', phone = '929 222 9999', street = '18 Somersby Gardens', city = 'London', state = 'UK', zip = 'IG45EA', timestamp = datetime.datetime(2007, 9, 17) ).put()
    datamodel.Contact(id = 1, name = 'Dion Almaer', email = 'dion@almaer.com', phone = '929 222 9999', street = '2985 Stamford Pl', city = 'Madison', state = 'WI', zip = '53711', timestamp = datetime.datetime(2008, 6, 10) ).put()
    
    datamodel.Contact(id = 2, name = 'Benji Galbs', email = 'ben@galbs.com', phone = '801 930 9587', street = '241 12th St', city = 'Draper', state = 'UT', zip = '83740', timestamp = datetime.datetime(2007, 8, 15) ).put()
    datamodel.Contact(id = 2, name = 'Ben Galbraith', email = 'ben@galbs.com', phone = '801 222 9999', street = '123 24th St', city = 'Salt Lake City', state = 'UT', zip = '83740', timestamp = datetime.datetime(2008, 2, 10) ).put()

    datamodel.Contact(id = 3, name = 'Jim Halberg', email = 'jim@halberg.com', phone = '223 123 9949', street = '029 Hotor Not Drive', city = 'Prairie Sun', state = 'WI', zip = '53998', timestamp = datetime.datetime(2008, 1, 5) ).put()

    datamodel.Contact(id = 4, name = 'Tom Geer', email = 'tom@geer.com', phone = '223 123 9949', street = '203 Sellto Soft Lane', city = 'Middleton', state = 'WI', zip = '53928', timestamp = datetime.datetime(2007, 11, 7) ).put()
    
    datamodel.Contact(id = 5, name = 'Rob Sanheim', email = 'rob@sanheim.com', phone = '608 293 8937', street = '8399 Seeking Alpha Avenue', city = 'Madison', state = 'WI', zip = '30495', timestamp = datetime.datetime(2007, 7, 21) ).put()
    datamodel.Contact(id = 5, name = 'Rob Sanheim', email = 'rob@sanheim.com', phone = '929 222 9999', street = '834 Raily Ninja Street', city = 'Dukie', state = 'NC', zip = '30495', timestamp = datetime.datetime(2008, 4, 1) ).put()
            
    self.response.out.write('Loaded all of the dummy contacts')

# -----------------------------------------------------------------------------
#  Do the real work
# -----------------------------------------------------------------------------

def main():
  application = webapp.WSGIApplication([
                      ('/', MainHandler),
                      ('/loadcontacts', LoadContactsHandler),
                      ('/savecontact', SaveContactHandler),
                      ('/loaddummy', LoadDummyHandler)
                      ], debug=True)
                      
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
