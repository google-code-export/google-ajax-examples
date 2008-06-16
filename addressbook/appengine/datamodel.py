from google.appengine.ext import db

"""Database models used in the Addressbook application."""

class Contact(db.Model):
  id = db.IntegerProperty(required = True)
  timestamp = db.DateTimeProperty(auto_now_add = True)
  name = db.StringProperty()
  email = db.EmailProperty()
  phone = db.PhoneNumberProperty()
  street = db.StringProperty()
  city = db.StringProperty()
  state = db.StringProperty()  
  zip = db.StringProperty()
