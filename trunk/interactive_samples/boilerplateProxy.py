import os
import wsgiref.handlers
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app


APIKeys = {
  "http://localhost:8082": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RSx5CqyNL2x2CpPAnLRjeOsKF3h9RS8MrYqU81Z7hEvk8hNGYDQPuHDIw",
  "http://localhost:8083": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RS4uSxNcZeiHmsInBcucCK4dMkMwRQvc88mil886PJxc7uBPrZFDeHEzw",
  "http://savedbythegoog.appspot.com": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q",
  "http://interactivesampler.appspot.com": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RQHF42S0NdyoEzlm7Prh6jpDX8u1BRWbrvF_ETKtOKL_Fpp8DKNik-umA",
  "http://code.google.com": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RSosDVG8KKPE1-m51RBrvYughuyMxQb4QY32wd-bGTUz44F9R1FRoxuMQ",
  "http://172.31.155.89:8082": "ABQIAAAApfWVg6qaIHQdkCxe56e57hTjpPIn9SDiNRzoec4tqssl2kJszBTEk7bhC42qvPfkfUqZw2ht8CyQzg"
}

class Main(webapp.RequestHandler):
  def get(self):
    # we do this because we need to find the path to the template.
    # it's relative to the path of this file, so if the url has apis/ajax/playground
    # we need to take it out
    path = self.request.path
    path = path[1:]
    path = path.replace('apis/ajax/playground/', '')

    url = self.request.url
    key = ''
    for i in APIKeys:
      if (url.find(i) != -1):
        key = APIKeys[i]

    self.template_values = {
      "key": key,
      "INSERT_JAVASCRIPT_HERE": 'try {if (window.parent && window.parent.is && window.parent.is.codeToRun) {window.eval(window.parent.is.codeToRun);window.onload = function() {window.document.body.onclick = function() {window.parent.is.uiEffects.bringRunBoxToFront();};};}} catch (e) {alert("Error: " + e.message);}'
    }

    path = os.path.join(os.path.dirname(__file__), path)
    self.response.out.write(template.render(path, self.template_values))

application = webapp.WSGIApplication([(r'/samples/boilerplateHTML/.*', Main),
                                      (r'/apis/ajax/playground/samples/boilerplateHTML/.*', Main)
                                     ],
                                     debug=True)

def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()