import os
import wsgiref.handlers
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app


def is_evil_path(path):
  return '..' in path or path.startswith('/')


class Main(webapp.RequestHandler):

  def get(self, path):
    if is_evil_path(path):
      return

    self.template_values = {}
    if not path.startswith('js'):
      self.template_values = {
        "key": "{{ key }}",
        "INSERT_JAVASCRIPT_HERE": 'INSERT_JAVASCRIPT_HERE'
      }

    path = os.path.join(os.path.dirname(__file__), 'samples', path)
    self.response.out.write(template.render(path, self.template_values))

application = webapp.WSGIApplication([(r'/samples/(.*)', Main),
                                      (r'/apis/ajax/playground/samples/(.*)', Main)
                                     ],
                                     debug=False)

def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()
