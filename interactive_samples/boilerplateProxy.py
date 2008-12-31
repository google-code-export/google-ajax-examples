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
  "http://172.31.80.237:8082": "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RSwFVzLkUibt4lYwTz0h9czjdYvyhTud0J2sKU0pvLgHpwEB7DN56BczQ"
}

class Main(webapp.RequestHandler):
  def get(self):
    path = self.request.path
    path = path[1:]
    url = self.request.url
    key = ''
    for i in APIKeys:
      if (url.find(i) != -1):
        key = APIKeys[i]

    self.template_values = {
      "key": key
    }
    path = os.path.join(os.path.dirname(__file__), path)
    self.response.out.write(template.render(path, self.template_values))

application = webapp.WSGIApplication([(r'/samples/boilerplateHTML/.*', Main)
                                     ],
                                     debug=False)

def main():
  run_wsgi_app(application)


if __name__ == '__main__':
  main()