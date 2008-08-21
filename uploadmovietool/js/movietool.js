if (typeof console == 'undefined') { // No Firebug on IE
  console = {};
  console.debug = window.alert;
}

function MovieTool() {
  // Google App Engine currently has a 1 MB limit on requests, responses,
  // and Data Store puts()
  /*
  this.CHUNK_BYTES = 1000000;  // 1 MB
  this.MAX_FILE_SIZE = 20000000; // ~20 MBs - max size of a file that can be uploaded
  this.TOTAL_QUOTA = 50000000; // ~50 MBs - total quota for movies for a user
  */
  
  this.CHUNK_BYTES = 200000;  // 200K
  this.MAX_FILE_SIZE = 1000000; // 1 MBs - max size of a file that can be uploaded
  this.TOTAL_QUOTA = 5000000; // 5 MBs - total quota for movies for a user
  this.UPLOAD_RETRIES = 3; // number of times to retry if there is an error
  this.geoAddress_ = null;
  this.movieList_ = [];
  this.pauseUpload_ = false;
  this.resumeFunction_ = null;
  this.locationLoaded_ = false;
  this.movieListLoaded_ = false;
  
  var self = this;
  window.onload = function() {
    self.run();
  }
}

MovieTool.prototype.run = function() {
  document.getElementById('movieSelect').disabled = true;
  document.getElementById('movieUpload').disabled = true;
  document.getElementById('moviePause').disabled = true;
  document.getElementById('movieResume').disabled = true;
  document.getElementById('clearMovies').disabled = true;
  
  var self = this;
  
  var selectButtons = function() {
    document.getElementById('movieSelect').disabled = false;
    
    if (self.movieList_.length > 0) {
      document.getElementById('clearMovies').disabled = false;
    }
    
    var uploadDisabled = true;
    for (var i = 0; i < self.movieList_.length; i++) {
      if (!self.movieList_[i].uploaded) {
        uploadDisabled = false;
        break;
      }
    }
    document.getElementById('movieUpload').disabled = uploadDisabled;
  }
  
  this.getLocation(function() {
    self.locationLoaded_ = true;
    if (self.locationLoaded_ && self.movieListLoaded_) {
      selectButtons();
    }
  });
  
  this.getMovieList(function() {
    self.movieListLoaded_ = true;
    if (self.locationLoaded_ && self.movieListLoaded_) {
      selectButtons();
    }
  });
}

MovieTool.prototype.getLocation = function(callback) {
  var geolocation = google.gears.factory.create('beta.geolocation');
  var self = this;
  geolocation.getCurrentPosition(
    function(p) {
      var addr = p.gearsAddress;
      var address = addr.city + ', ' + addr.region + ', ' + addr.country;
      var latitude = p.latitude;
      var longitude = p.longitude;
      self.geoAddress_ = address + ' (' + latitude + ', ' + longitude + ')';
      document.getElementById('location').innerHTML = self.geoAddress_;
      callback();
    },

    function(err) {
      var msg = 'Error retrieving your location: ' + err.message;
      document.getElementById('location').innerHTML = msg;
      callback();
    },
    
    { 
      enableHighAccuracy: true, 
      gearsRequestAddress: true,
      gearsLocationProviderUrls: ['http://www.google.com/loc/json'] 
    }
  );
}

MovieTool.prototype.getMovieList = function(callback) {
  var req = google.gears.factory.create('beta.httprequest');
  req.open('GET', '/list');
  var self = this;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        var loadingMsg = document.getElementById('loadingFilesMsg');
        loadingMsg.parentNode.removeChild(loadingMsg);
        self.movieList_ = eval(req.responseText);
        for (var i = 0; i < self.movieList_.length; i++) {
          var entry = self.movieList_[i];
          // associative entry for fast lookup based on filename
          self.movieList_['_' + entry.filename] = entry;
          var status = 'Uploaded'
          var percent = '100%';
          
          // was this movie partially uploaded during an earlier browser
          // session?
          if (entry.uploaded == false && entry.blob == null) {
            status = 'Partially uploaded; re-select file to continue uploading';
            percent = Math.round((entry.bytesUploaded / entry.length) * 100) + '%';
          }
          
          // is this movie too large?
          if (entry.uploaded == false && entry.length > self.MAX_FILE_SIZE) {
            status = 'File too large';
            percent = 'N/A';
          }
          
          self.drawRow(entry.filename, entry.geoAddress, status, percent);
        }
      }
      
      callback();
    }
  }
  
  req.send();
}

MovieTool.prototype.selectFiles = function() {
  var desktop = google.gears.factory.create('beta.desktop');
  var self = this;
  desktop.openFiles(
    function(files) {
      for (var i = 0; i < files.length; i++) {
        var entry = {filename: files[i].name, uploaded: false, 
                            length: files[i].blob.length, 
                            blob: files[i].blob, bytesUploaded: 0, 
                            geoAddress: self.geoAddress_, uploadRetries: 0};
        if (self.movieList_['_' + entry.filename]) {
          // was previously uploaded at an earlier browser session
          var oldEntry = self.movieList_['_' + entry.filename];
          if (!oldEntry.uploaded) { // partial upload
            oldEntry.length = entry.length;
            oldEntry.blob = entry.blob;
            var percent = Math.round((oldEntry.bytesUploaded / oldEntry.length) * 100);
            self.updateStatus(oldEntry.filename, 'Not uploaded', percent + '%');
          } else {
            self.updateStatus(oldEntry.filename, 'Uploaded', '100%');
          }
        } else { // new file
          // associative entry for fast lookup based on filename
          self.movieList_['_' + entry.filename] = entry;                    
          self.movieList_.push(entry);
          
          var status = 'Not uploaded';
          var percent = '0%';
          // is this movie too large?
          if (entry.length > self.MAX_FILE_SIZE) {
            status = 'File too large';
            percent = 'N/A';
          }
          
          self.drawRow(files[i].name, self.geoAddress_, status, percent);
        }
      }
      
      document.getElementById('movieUpload').disabled = false;
      document.getElementById('clearMovies').disabled = false;
    }, 
    
    { filter: ['video/quicktime', '.wmv', 'video/avi'] }
  );
}

MovieTool.prototype.drawRow = function(filename, locStr, status, percent) {
  var fileList = document.getElementById('fileList');
  var tr = fileList.insertRow(-1);
  tr.setAttribute('filename', filename);
  
  var td = document.createElement('td');
  td.innerHTML = filename;
  td.className = 'filenameCol';
  if (status == 'Uploaded') {
    td.innerHTML = '<a target="_blank" '
                        + 'href="/view?filename=' + filename + '">'
                        + filename + '</a>';
  }
  tr.appendChild(td);
  
  td = document.createElement('td');
  if (!locStr) {
    locStr = 'Not Available';
  }
  td.innerHTML = locStr;
  td.className = 'locationCol';
  tr.appendChild(td);
  
  td = document.createElement('td');
  td.innerHTML = status;
  td.className = 'statusCol';
  tr.appendChild(td);
  
  td = document.createElement('td');
  td.innerHTML = percent;
  td.className = 'uploadedCol';
  tr.appendChild(td);
}

MovieTool.prototype.upload = function() {
  if (!this.movieList_ || this.movieList_.length == 0) {
    return;
  }
  
  this.pauseUpload_ = false;
  document.getElementById('moviePause').disabled = false;
  document.getElementById('movieUpload').disabled = true;
  document.getElementById('movieSelect').disabled = true;
  document.getElementById('clearMovies').disabled = true;
  
  this.totalUploaded_ = 0;
  var self = this;
  var callback = function(){
    self.totalUploaded_++;
    
    // handle pausing
    if (self.totalUploaded_ < self.movieList_.length && self.pauseUpload_) {
      var pauseButton = document.getElementById('moviePause');
      pauseButton.innerHTML = 'Paused';
      // save state information for later resumption using a closure
      self.resumeFunction_ = function() {
        self.uploadFile(self.movieList_[self.totalUploaded_], callback);
      }
      return;
    }
    
    if (self.totalUploaded_ < self.movieList_.length) {
      self.uploadFile(self.movieList_[self.totalUploaded_], callback);
    } else { // finished
      document.getElementById('movieUpload').disabled = false;
      document.getElementById('movieSelect').disabled = false;
      document.getElementById('clearMovies').disabled = false;
      document.getElementById('movieResume').disabled = true; 
      var pauseButton = document.getElementById('moviePause');
      pauseButton.disabled = true;
      pauseButton.innerHTML = 'Pause';
    }
  };
  
  this.uploadFile(this.movieList_[this.totalUploaded_], callback);
}

MovieTool.prototype.uploadFile = function(entry, finishedCallback) {
  entry.uploadRetries = 0;
  
  if (entry.uploaded) {
    finishedCallback();
    return;
  }
  
  if (entry.blob == null) {
    // server has partial file uploaded, but we don't have enough on
    // client to upload anymore; user must re-select file
    return;
  }
  
  // is this movie too large?
  if (entry.length > this.MAX_FILE_SIZE) {
    this.updateStatus(entry.filename, 'File too large', 'N/A');
    finishedCallback();
    return;
  }
  
  // will uploading this movie bump us over our total movie quota?
  var quotaUsed = entry.length;
  for (var i = 0; i < this.movieList_.length; i++) {
    if (this.movieList_[i].filename == entry.filename) {
      // stop counting size after our entry
      break;
    }
    
    quotaUsed += this.movieList_[i].length;
  }
  if (quotaUsed >= this.TOTAL_QUOTA) {
    this.updateStatus(entry.filename, 'You have used up all your available '
                      + 'quota space', 'N/A');
    finishedCallback();
    return;                           
  }
  
  
  // start uploading chunks
  start = 0;
  
  if (entry.bytesUploaded != 0) {
    // for partially uploaded files from earlier browser sessions
    start = entry.bytesUploaded + 1;
  }
  
  var total = entry.length;
  var end = start + this.CHUNK_BYTES - 1;
  var chunkLength = this.CHUNK_BYTES;
  if (end >= total) {
    end = total - 1;
    chunkLength = end - start + 1;
  }
  var chunk = entry.blob.slice(start, chunkLength);
  
  var self = this;
  var chunkCallback = function(finished, start, end) { // called as each chunk returns
    if (finished) {
      finishedCallback();
    } else {
      var newStart = end + 1;
      var newEnd = newStart + self.CHUNK_BYTES - 1;
      var chunkLength = self.CHUNK_BYTES;
      if (newEnd >= total) {
        newEnd = total - 1;
        chunkLength = newEnd - newStart + 1;
      }
      var newChunk = entry.blob.slice(newStart, chunkLength);
      self.sendChunk(entry, newChunk, newStart, newEnd, total, chunkCallback);
    }
  }
  
  this.sendChunk(entry, chunk, start, end, total, chunkCallback);
}

MovieTool.prototype.sendChunk = function(entry, chunk, start, end, total,
                                          callback) {
  //console.debug('sendChunk, start='+start+', end='+end+', total='+total);
  var percentage = Math.round((end / total) * 100);
  var fileName = entry.filename;
  
  // handle pausing
  if (this.pauseUpload_) {
    var pauseButton = document.getElementById('moviePause');
    pauseButton.innerHTML = 'Paused';
    this.updateStatus(fileName, 'Paused', percentage + '%');
    // save state information for later resumption using a closure
    var self = this;
    this.resumeFunction_ = function() {
      self.sendChunk(entry, chunk, start, end, total, callback);
    }
    
    return;
  }
  
  var req = google.gears.factory.create('beta.httprequest');
  var byteRange = start + '-' + end + '/' + total;
  
  var uploadURL = '/upload';
  if (entry.geoAddress) {
    uploadURL += '?geoAddress=' + encodeURIComponent(entry.geoAddress);
  }
  req.open('POST', uploadURL);
  
  req.setRequestHeader('Content-Disposition',
                        'attachment; filename="' + fileName + '"');
  req.setRequestHeader('Content-Type', 'application/octet-stream');
  req.setRequestHeader('Content-Range', 'bytes ' + byteRange);
  
  var self = this;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      //console.debug('responseText='+req.responseText);
      if (req.status == 200) {
        if ((end + 1) == total) { // we are completely finished
          self.updateStatus(fileName, 'Uploaded', '100%');
          entry.uploaded = true;
          entry.uploadRetries = 0;
          entry.bytesUploaded = total;
          callback(true);
        } else { // chunk uploaded, but more chunks to be done
          self.updateStatus(fileName, 'Uploading...', percentage + '%');
          entry.bytesUploaded = end;
          callback(false, start, end);
        }
      } else { // error!
        // try again
        if (entry.uploadRetries < self.UPLOAD_RETRIES) { 
          entry.uploadRetries++;
          self.updateStatus(fileName, 'Uploading... (Retry '
                            + entry.uploadRetries + ')', percentage + '%');
          self.sendChunk(entry, chunk, start, end, total, callback);
        } else { // out of retries
          self.updateStatus(fileName, 'Failed', percentage + '%');
          console.debug('Error, status=' + req.status
                        + ', responseText='+req.responseText);
          callback(true);
        }
      }
    }
  } // end onreadystatechange
  
  req.send(chunk);
}

MovieTool.prototype.updateStatus = function(fileName, statusMsg, percent) {
  var row = null;
  var table = document.getElementById('fileList');
  for (var i = 0; i < table.childNodes.length; i++) {
    row = table.childNodes[i];
    if (row.nodeType != 1 || row.className.indexOf('header') != -1
        || row.getAttribute('filename') != fileName) {
      continue;
    }
    
    var nameTD = row.childNodes[0];
    
    if (statusMsg == 'Uploaded') {
      nameTD.innerHTML = '<a target="_blank" '
                          + 'href="/view?filename=' + fileName + '">'
                          + fileName + '</a>';
    }
    
    var statusTD = row.childNodes[2];
    statusTD.innerHTML = '';
    statusTD.appendChild(document.createTextNode(statusMsg));
    
    var percentTD = row.childNodes[3];
    percentTD.innerHTML = '';
    percentTD.appendChild(document.createTextNode(percent));
  }
}

MovieTool.prototype.pauseUpload = function() {
  this.pauseUpload_ = true;
  var pauseButton = document.getElementById('moviePause');
  pauseButton.disabled = true;
  pauseButton.innerHTML = 'Pausing...';
  
  document.getElementById('movieResume').disabled = false;
}

MovieTool.prototype.resumeUpload = function() {
  this.pauseUpload_ = false;
  var resumeButton = document.getElementById('movieResume');
  resumeButton.disabled = true;
  
  var pauseButton = document.getElementById('moviePause');
  pauseButton.disabled = false;
  pauseButton.innerHTML = 'Pause';
  
  // resume things where they left off; we captured the state of the next
  // action using a closure, which we can run now
  this.resumeFunction_();
}

MovieTool.prototype.clearMovies = function() {
  document.getElementById('movieSelect').disabled = true;
  document.getElementById('movieUpload').disabled = true;
  document.getElementById('moviePause').disabled = true;
  document.getElementById('movieResume').disabled = true;
  document.getElementById('clearMovies').disabled = true;
  
  var listTable = document.getElementById('fileList');
  listTable.setAttribute('border', 0);
  listTable.innerHTML = '';
  var tr = listTable.insertRow(-1);
  var td = document.createElement('td');
  td.setAttribute('colspan', 4);
  td.innerHTML = 'Deleting movies...';
  tr.appendChild(td);
  
  // clear uploaded movies on the server, then clear them from the table
  var req = google.gears.factory.create('beta.httprequest');
  req.open('GET', '/clear');
  var self = this;
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        // just wipe out the table and re-create it; Firefox has some UI
        // glitchiness when we remove rows manually
        listTable.parentNode.removeChild(listTable);
        var table = document.createElement('table');
        table.id = 'fileList'
        table.setAttribute('border', 1);
        table.innerHTML = 
          '<tr class="header">'
          + '  <th class="filenameCol">Filename</th>'
  				+ '	<th class="locationCol">Location</th>'
          + '  <th class="statusCol">Status</th>'
          + '  <th class="uploadedCol">Uploaded</th>'
          + '</tr>';
        document.getElementsByTagName('body')[0].appendChild(table);
        
        document.getElementById('clearMovies').disabled = true;
        
        self.movieList_ = [];
      } else {
        alert('Unable to clear movies: ' + req.status);
        document.getElementById('clearMovies').disabled = false;
      }
      
      document.getElementById('movieSelect').disabled = false;
      document.getElementById('movieUpload').disabled = true;
      document.getElementById('moviePause').disabled = true;
      document.getElementById('movieResume').disabled = true;
      
      // fix closure DOM memory leaks for IE 6
      tr = td = listTable = null;
      
    }
  }
  
  req.send();  
}

var movie = new MovieTool();
