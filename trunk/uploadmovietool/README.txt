Upload Movie Tool
-----------------

Author: Brad Neuberg (http://codinginparadise.org)
Last Release: August 21st, 2008

This demo allows you to select multiple movies, and then upload them in a resumable way with feedback using the Gears Blob and File System API. We also use the Geolocation API to figure out what your location is for tagging the video, and the Google App Engine to store everything on the back-end. Videos will be deleted every 30 minutes automatically, and only you can view your own videos to avoid copyright issues on this demo app. Due to current limitations in the Google App Engine, videos must be 1 MB or less in size, while your total quota of uploaded videos must be less than 5 MB.

This sample requires a server-side to run. The server-side uses Google App Engine. An example already-running server side implementation of this is running at http://uploadmovietool.appspot.com. Follow the directions there to use the demo.

If you want to run things locally, you can download the Google App Engine SDK  (http://code.google.com/appengine/downloads.html). Once installed, jump up one directory from this one, and type:

dev_appserver.py --clear_datastore --port 9090 uploadmovietool/

In your browser, navigate to:

http://localhost:9090/

Directions on getting the server-side to run on the real Google App Engine is beyond this README; see the app engine documentation for details (http://code.google.com/appengine/docs/gettingstarted/).