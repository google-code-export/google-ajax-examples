import os
import cgi
import re
import time
import datetime

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.ext.webapp.util import login_required
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class Movie(db.Model):
	owner = db.UserProperty()
	filename = db.StringProperty()
	intermediate_data = db.StringProperty(default=None)
	blob = db.BlobProperty(default=None)
	length = db.IntegerProperty(default=None)
	bytes_uploaded = db.IntegerProperty(default=0)
	uploaded = db.BooleanProperty(default=False)
	geoAddress = db.StringProperty(default=None)
	datetime = db.DateTimeProperty(auto_now_add=True)

class MainPage(webapp.RequestHandler):
	@login_required
	def get(self):
		user = users.get_current_user()

		template_values = {
			'user': user,
			'logout_url': users.create_logout_url(self.request.uri)
		}
		
		path = os.path.join(os.path.dirname(__file__), 'index.html')
		self.response.out.write(template.render(path, template_values))

class Upload(webapp.RequestHandler):
	# Google App Engine currently has a 1 MB limit on requests, responses,
  # and Data Store puts()	
	
	#MAX_FILE_SIZE = 20000000 		# ~20 MBs - max size of a file that can be uploaded
	#TOTAL_QUOTA = 50000000			# ~50 MBs - total quota for movies for a user
	
	MAX_FILE_SIZE = 1000000 		# 1 MB - max size of a file that can be uploaded
	TOTAL_QUOTA = 5000000				# 5 MBs - total quota for movies for a user
	
	def post(self):
		user = users.get_current_user()

		if not user:
			self.redirect(users.create_login_url(self.request.uri))
			
		# Cleanup any old movies that have timed out from all users
		self.cleanup()

		filename = self.request.headers['Content-Disposition']
		filename = re.search('^attachment; filename=\"([^\"]*)\"$', filename).groups()[0]

		# Get what byte range we are dealing with
		byteRange = self.request.headers['Content-Range']
		matches = re.search('^bytes ([^\-]*)\-([^\/]*)\/(.*)$', byteRange)
		start = long(matches.group(1))
		end = long(matches.group(2))
		total = long(matches.group(3))
		
		# Get any location information
		geoAddress = None
		if self.request.get('geoAddress') != '':
			geoAddress = self.request.get('geoAddress')

		# Delete old completed entries that match this filename
		query = Movie.gql('WHERE filename = :1 AND owner = :2', filename, user) 
		m = None
		if query.count() > 0:
			m = query[0]
			if m.length != None and m.bytes_uploaded != None and m.length == m.bytes_uploaded:
				db.delete(query)
				m = Movie(owner=user, filename=filename)

		# Get old partially uploaded data already saved
		query = Movie.gql('WHERE filename = :1 AND owner = :2 LIMIT 1', filename, user)
		if query.count() == 1:
			m = query[0]
			
		# Will uploading this full file put the user over their quota?
		quotaUsed = total
		for entry in Movie.gql('WHERE owner = :1', user):
			if entry.filename != filename:
				quotaUsed += entry.length
		if quotaUsed >= self.TOTAL_QUOTA:
			self.error(413) # 413 = Request Too Large
			return

		# If we are just starting, create an entry; else if
		# there is nothing in the database and we _aren't_
		# the first range chunk, return an error
		if m == None and start == 0:
			m = Movie(owner=user, filename=filename)
		elif m == None and start > 0:
			self.error(500)					
			return

		# If there is something in the db, but our chunk is earlier than that
		# delete what is in the db
		if m != None and m.bytes_uploaded != 0 and start < m.bytes_uploaded:
			m.delete()
			m = Movie(owner=user, filename=filename)

		# Update Movie with new range and geographic information
		if m.blob != None:
			m.blob = db.Blob(m.blob + self.request.body)
		else:
			m.blob = db.Blob(self.request.body)
		m.length = total
		m.bytes_uploaded = end + 1
		m.geoAddress = geoAddress
		if m.bytes_uploaded == m.length:
			m.uploaded = True
		m.put()
		
		# Look at our total length so far for this file; if its greater than 
		# ~20 megabytes reject and delete this movie
		if m.bytes_uploaded > self.MAX_FILE_SIZE:
			m.delete()
			self.error(413) # 413 = Request Too Large
			return
		
		self.response.headers['Content-Type'] = 'text/plain'
		self.response.out.write('200 OK')
		
	def cleanup(self):
		# Get all movies that are finished uploading and are more than
		# 30 minutes old (30 minutes * 60 seconds = 1800)
		movies = Movie.gql('WHERE uploaded = TRUE')
		now = datetime.datetime.now()
		threshold = datetime.timedelta(minutes=30)
		self.response.headers['Content-Type'] = 'text/plain'
		for m in movies:
				diff = now - m.datetime
				self.response.out.write(diff.seconds)
				if diff >= threshold:
					m.delete()

class MovieView(webapp.RequestHandler):
	@login_required
	def get(self):
		filename = self.request.get('filename');	
		user = users.get_current_user()
		query = Movie.gql('WHERE filename = :1 AND owner = :2', filename, user)
		
		if query.count() == 0:
			self.error(404)
			return
		else:
			blob = query[0].blob
			
			mimeType = None
			filename = filename.lower()
			if filename.find('.qt') != -1 or filename.find('.mov') != -1:
				mimeType = 'video/quicktime'
			elif filename.find('.wmv') != -1:
				mimeType = 'video/x-ms-wmv'
			elif filename.find('.avi') != -1:
				mimeType = 'video/avi'
				
			if mimeType == None:
				self.error(500)
				return
				
			self.response.headers['Content-Type'] = mimeType
			self.response.out.write(blob)
			
class ListMovies(webapp.RequestHandler):
	@login_required
	def get(self):
		user = users.get_current_user()
		query = Movie.gql('WHERE owner = :1', user)
		
		results = '[\n';
		
		if query.count() != 0:
			for i, movie in enumerate(query):
				geoAddress = 'null'
				if movie.geoAddress != None:
					geoAddress = '"' + movie.geoAddress + '"'
					
				entry = '\t{\n'
				entry += '\t\tfilename: "' + movie.filename + '", \n'
				uploaded = True
				if movie.bytes_uploaded < movie.length:
					uploaded = False
				entry += '\t\tuploaded: ' + str(uploaded).lower() + ', \n'
				entry += '\t\tlength: ' + str(movie.length) + ', \n'
				entry += '\t\tblob: null, \n'
				entry += '\t\tbytesUploaded: ' + str(movie.bytes_uploaded) + ', \n'
				entry += '\t\tgeoAddress: ' + geoAddress + ', \n'
				entry += '\t\tuploadRetries: 0\n'
				entry += '\t}'
				
				if i != (query.count() - 1):
					entry += ', \n\n'
				else:
					entry += '\n'
				
				results += entry
		results += ']\n'
			
		self.response.headers['Content-Type'] = 'text/javascript'
		self.response.out.write(results)
		
class ClearMovies(webapp.RequestHandler):
	@login_required
	def get(self):
		user = users.get_current_user()
		query = Movie.gql('WHERE owner = :1', user)
		for movie in query.fetch(100):
			movie.delete()
		
		self.response.headers['Content-Type'] = 'text/plain'
		self.response.out.write('200 OK')
		
application = webapp.WSGIApplication(
																		 [('/', MainPage),
																			('/upload', Upload),
																			('/view', MovieView),
																			('/list', ListMovies),
																			('/clear', ClearMovies)],
																		 debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()