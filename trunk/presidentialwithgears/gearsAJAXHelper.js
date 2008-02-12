(function() {
  if(typeof console == "undefined"){
    console = new Object();
    console.log = function(msg){}
  }


  gearsAJAXHelper = {
    _localServer : null,
    _resourceStore : null,
    _storeName : null,
    _db : null,
    _dbName : null,
    _storedURLs : null,
    _cacheResources : null,
    
    /** 
     * Called to initialize the library.
     */
    initialize : function(dbname, storename, cacheResources) {
      if(!this._gearsInstalled() || typeof dbname != 'string' || 
         typeof storename != 'string') {
        return;
      }
      
      this._cacheResources = cacheResources;
      this._storeName = storename;
      this._dbName = dbname;

      if(this._cacheResources) {
        // init localserver
        this._localServer = google.gears.factory.create('beta.localserver',
                                                        '1.0');
        this._resourceStore = this._localServer.createStore(this._storeName);
        this._storedURLs = this._discoverFiles();
        this._capture(this._storedURLs);
      }

      // init database
      this._db = google.gears.factory.create('beta.database', '1.0');
      this._db.open(this._dbName);
      this._db.execute('CREATE TABLE if not exists ' + this._dbName + 
                       ' (key TEXT, value TEXT)');
    },

    /** 
     * A function for refreshing the Database and LocalServer
     */
    refresh : function() {
      if(!this._gearsInstalled()) {
        return;
      }
      if(this._cacheResources) {
       this._localServer.removeStore(this._storeName); 
      }
      this._db.execute('DROP TABLE ' + this._dbName);
      location.href = location.href;
    },

    /** 
     * For returning the VALUE associated with a KEY
     */
    returnKeyVal : function(key) {
      if(!this._gearsInstalled()) {
        return;
      }
      var rs = this._db.execute('SELECT * FROM ' + this._dbName + 
                                ' WHERE key = ?', [key]);
      var result = rs.isValidRow() ? rs.fieldByName('value') : false;

      rs.close();
      return result;
    },

    /** 
     * For storing a KEV/VALUE pair in the local Database.
     */
    storeKeyVal : function(key, value) {
      if(!this._gearsInstalled()) {
        return;
      }
      if(!this.returnKeyVal(key)) {
        var rs = this._db.execute('INSERT INTO ' + this._dbName + 
                                  ' VALUES (?, ?)', [key, value]);
      } else {
        var rs = this._db.execute('UPDATE ' + this._dbName + 
                                  ' SET value = ? WHERE key = ?', [value, key]);
      }
    },

    /** 
     * A function for capturing multiple URLs in the LocalServer.
     */
    _capture : function(URLs) {
      for(prop in URLs) {
        if(URLs[prop] != '______array') {
          if(this._resourceStore.isCaptured(URLs[prop])) {
            console.log('Cache Grabbed Resource: ' + URLs[prop]);
          } else {
            this._resourceStore.capture(URLs[prop], 
              function(url,success,captureID){ 
                console.log('Fresh Grab: ' + url + ' success: ' + success); 
              }
            );
          } 
        }
      }
    },

   /** 
    * Thanks to Brad Neuberg's code in Dojo Offline Toolkit
    * return a list of resources required by this page, including:
    *    - the page calling this script
    *    - any referenced javascript files
    *    - any referenced stylesheets (including @import)
    *    - any inline images
    *    - any images referenced in the linked stylesheets
    * note that the following ARE NOT automatically discovered:
    *    - dynamically generated scripts or content
    *    - resources referenced by <object> or <embed> tags
    *    - ActiveX controls or Java Applets
    */
    _discoverFiles : function() {
      var elements;
      var e;
      var i;
      var files = [];

      // this page
      files.push(window.location.href);

      // referenced scripts
      elements = document.getElementsByTagName("script");
      for(i=0;i<elements.length;i++){
        e = elements[i];
        if(e.src && e.src != "") files.push(e.src);
      }

      // referenced inline images
      elements = document.getElementsByTagName("img");
      for(i=0;i<elements.length;i++){
        e = elements[i];
        if(e.src && e.src != "") files.push(e.src);
      }

      // referenced stylesheets
      elements = document.getElementsByTagName("link");
      for(i=0;i<elements.length;i++){
        e = elements[i];
        if(e.rel && e.rel.toLowerCase() == "stylesheet") files.push(e.getAttribute("href"));
      }

      // @import and url()
      if(document.styleSheets && document.styleSheets.length){
        for(var i=0;i<document.styleSheets.length;i++){
          this._parseStylesheets(document.styleSheets[i], files);
        }
      }
      var inDomainURLs = [];
      var domain = location.protocol + "//" + location.host;
      var inDomainReg = new RegExp(domain + "/*");
      for(prop in files) {
        if(inDomainReg.test(files[prop])){
          inDomainURLs.push(files[prop]);
        }
      }
      // console.log(inDomainURLs);
      return inDomainURLs;
    },

    /** 
     * Grabs a list of all stylesheets on the page.
     */
    _parseStylesheets : function(sheet, files){
      try{
        // handle @import recursively (IE only)
        if(sheet.imports && sheet.imports.length){
          for(var i=0;i<sheet.imports.length;i++){
            files.push(sheet.imports[i].href);
            parseStylesheets(sheet.imports[i], files);
          }
        }

        var rules = (sheet.cssRules || sheet.rules);
        if(rules && rules.length){
          for(var r=0;r<rules.length;r++){
            var rule = rules[r];

            // handle @imports recursively (FF)
            if(rule.styleSheet) parseStylesheets(rule.styleSheet, files);

            var text = (rule.cssText || rule.style.cssText);
            if(text){
              var matches = text.match(/url\(\s*([^\) ]*)\s*\)/i);
              if(matches){
                for(var j = 1; j < matches.length; j++){
                  files.push(matches[j]);
                }
              }
            }
          }
        }
      } catch(err) {
      }
    },

    /** 
     * Returns true/false if Gears is installed or not.
     */
    _gearsInstalled : function() {
      return (!window.google || !google.gears) ? false : true;
    }
  }
})();