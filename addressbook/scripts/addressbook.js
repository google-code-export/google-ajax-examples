// -- Configuration and Storage
var contactCurrent;
var contactCurrentIndex;
var savedContact = {};
var contactHolder;

var loadDummyData = true;
var slider;
var selectedElement;
var contactInfo = $A(['id', 'timestamp', 'name', 'email', 'phone', 'street', 'city', 'state', 'zip']);
var editInputSettings = {
  'name': ' style="font-size: 24px; height: 38px"',
  'city': ' size="8"',
  'state': ' size="3" maxlength="2"',
  'zip': ' size="5" maxlength="10"',
};

// -- DOM Events
function select(e, reload) {
	if ((reload == null) && (e == selectedElement)) return;

  contactCurrent = contactHolder.get(e.id.substring(2));

  slider.setValue(1.0);
  
	showContact();
}

function checkMouseOver(e) {
	if ( (e.className != 'highlighted') && (e.className != 'selected') ) e.className = 'highlighted';
}

function checkMouseOut(e) {
	if (e != selectedElement) e.className = '';
}

function edit(button) {
  $(button).value = 'save';
    
  contactInfo.each(function(info) {
    if (info == 'id' || info == 'timestamp') {
      savedContact[info] = $(info).value;
      return;
    }
        
    savedContact[info] = $(info).innerHTML; // save it away
    
    $(info).innerHTML = '<input type="text" id="save-' + info + '" value="' + $(info).innerHTML + '"' + ( (editInputSettings[info]) ? editInputSettings[info] : '') + ' />';
	});
    
  $(button).onclick = function() {
    save(button);
  }
  
  $('name').onclick = null; // the h2 header shouldn't be clickable while editing
}

function save(button) {
  $(button).value = 'edit';
  
  contactInfo.each(function(info) {
    if (info == 'id' || info == 'timestamp') return;

    $(info).innerHTML = $('save-' + info).value;
	});
	
  $('name').onclick = $(button).onclick = function() { // reset the button and h2 header
    edit(button);
  }
  
  saveDb();
}

// -- Data Model

var ContactHolder = Class.create();
ContactHolder.prototype = {
  initialize: function() {
    this.initDb();
    this.load();
  },
  
  get: function(index) {
    return this.contacts[index]; // return a Contact
  },

  add: function(contact) {
    this.db.insertRow('contacts', contact);
    this.load(); // naughty side effect. just reload
  },
  
  load: function() {
    this.contacts = {}; // start so fresh and so clean
    var contacts = this.db.selectRows('contacts', '1=1');

    for (var i = 0; i < contacts.length; i++) {
      var contact = contacts[i];
      if (!this.contacts[contact.id]) this.contacts[contact.id] = new Contact();
      this.contacts[contact.id].add(contact);
    }
  },
  
  names: function() {
    var names = {};
    for (var i in this.contacts) {
      var contact = this.contacts[i].current();
      names[contact.id] = contact.name;
    }
    return names;
  },
  
  initDb: function() {
    var db = this.db = new GearsDB('addressbook');

    db.run('create table if not exists contacts (' +
               'id integer not null,' +
               'name varchar(255) not null,' +
               'email varchar(255),' +
               'phone varchar(12),' +
               'street varchar(255),' +
               'city varchar(255),' +
               'state varchar(2),' +
               'zip varchar(10),' +
               'timestamp int not null)');

    db.run('CREATE INDEX IF NOT EXISTS contacts_id_index ON contacts (id)');

    if (loadDummyData) {
      db.run('delete from contacts');

      // initialize the "now" data
      // Dion
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [1, 'Dion Gary Almaer', 'dion@gmail.com', '223 123 9949', '203 Boston Common', 'Cambridge', 'MA', '00122', 1183878000000]);
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [1, 'Dion Almaer', 'dion@almaer.com', '929 222 9999', '18 Somersby Gardens', 'London', 'UK', 'IG45EA', 1199606400000]);
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [1, 'Dion Almaer', 'dion@almaer.com', '929 222 9999', '2985 Stamford Pl', 'Madison', 'WI', '53711', new Date().getTime()]);

      // Ben
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [2, 'Benji Galbs', 'ben@galbs.com', '801 930 9587', '241 12th St', 'Draper', 'UT', '83740', 1203753600000]);
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [2, 'Ben Galbraith', 'ben@galbs.com', '801 222 9999', '123 24th St', 'Salt Lake City', 'UT', '83740', 1192258800000]);

      // Jim
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [3, 'Jim Halberg', 'jim@halberg.com', '223 123 9949', '029 Hotor Not Drive', 'Prairie Sun', 'WI', '53998', 1207810800000]);

      // Tom
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [4, 'Tom Geer', 'tom@geer.com', '223 123 9949', '203 Sellto Soft Lane', 'Middleton', 'WI', '53928', 1203753600000]);

      // Rob
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [5, 'Rob Sanheim', 'rob@sanheim.com', '608 293 8937', '8399 Seeking Alpha Avenue', 'Madison', 'WI', '30495', 1183532400000]);
      db.run('insert into contacts (id, name, email, phone, street, city, state, zip, timestamp) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [5, 'Rob Sanheim', 'rob@sanheim.com', '929 222 9999', '834 Raily Ninja Street', 'Dukie', 'NC', '30495', 1192258800000]);
    }
  }
};

var Contact = Class.create();
Contact.prototype = {
  
  initialize: function() {
    this.data = [];
  },
  
  edits: function() {
    return this.data.length;
  },
  
  current: function() {
    return this.data[this.data.length - 1];
  },
  
  get: function(index) {
    return this.data[index];
  },
  
  add: function(properties) {
    this.data.push(properties);
  }

};

function showContact(index) {
  if (index == null) index = contactCurrent.edits() - 1;
  var contact = contactCurrent.get(index);
	contactInfo.each(function(key) {
	  if (key == 'id') {
	    $(key).value = contact['id'];
	    return;
	  }
	  
	  if (key == 'timestamp') {
	    var date = new Date(contact['timestamp']);
	    $(key).innerHTML = 'Created: ' + (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
	    return;
	  }
    
	  $(key).innerHTML = contact[key];
	});
			
	$('info').show();
  $('editsavebutton').show();
	$('editsavebutton').disabled = false;
	$('editsavebutton').value = 'edit';
	$('editsavebutton').onclick = function() {
	  edit($('editsavebutton'));
	}
	$('name').onclick = function() {
	  edit($('editsavebutton'));
	}
	
	if (selectedElement != null) selectedElement.className = '';

	var component = $('id' + contact.id);
	component.className = 'selected';
	selectedElement = component;

  showSavedEntries(index+1, contactCurrent.edits()); // show the count
}

function saveDb() {
  if (!contentsChanged()) return;
  var newContact = contactFromForm();
  contactHolder.add(newContact);
  
  initTabs(); // in case a name changed
  select($('id' + newContact.id), true); // reload it!  
}

function contentsChanged() { // test to see if the data has changed or not in the form
  for (var i in contactInfo) {
    if (!contactInfo.hasOwnProperty(i)) continue;
    var key = contactInfo[i];
    
    if (key == 'timestamp') continue; // ignore timestamp
    
    var formValue = (key == 'id') ? $(key).value : $(key).innerHTML;

    if (formValue != savedContact[key]) return true;
  }
  return false;
}

function contactFromForm() { // morph the form data into a contact object
  var contact = {};
  for (var i in contactInfo) {
    if (!contactInfo.hasOwnProperty(i)) continue;
    
    var key = contactInfo[i];

    contact[key] = (key == 'id') ? $(key).value : $(key).innerHTML;
  }
  contact['timestamp'] = new Date().getTime();
  
  return contact;
}

function showSavedEntries(num, total) { // the history element
  if (total > 1) {
    if (num == total) {
      $('history').innerHTML = contactCurrent.edits() + ' saved entries';
    } else {
      $('history').innerHTML = 'showing ' + num + ' of ' + total + ' saved entries';
    }
    $('slider').show();
  } else {
    $('history').innerHTML = '';
    $('slider').hide();
  }
}

function calculateContactChange(v) { // calculate where the slider is in comparison to the entries
  if (v == 1.0) v = 0.99;
  var diff = 1.0 / contactCurrent.edits();
  var num = parseInt(v / diff);    

  if (contactCurrentIndex == null) contactCurrentIndex = contactCurrent.edits() - 1;
  if (num == contactCurrentIndex) return;
  contactCurrentIndex = num;
  
  showContact(num);
}


function initTabs() { // seed the tabs with the contacts
  var list = '';
  
  var names = contactHolder.names();
  
  for (var id in names) {
    var name = names[id];
    list += '<li id="id' + id + '" onmouseover="checkMouseOver(this);" onmouseout="checkMouseOut(this);" onclick="select(this);">' + name + '</li>';
  }
  $('tabs').innerHTML = list;
}

function initSlider() { // setup the slider object
  slider = new Control.Slider('handle', 'slider', {
	  sliderValue: 1,
		onSlide: function(v) {
		  calculateContactChange(v);
		}
	});
	$('slider').hide();	
}

// -- The driver
window.onload = function() {
  // setup the database
	contactHolder = new ContactHolder();
	
	// Display tabs
	initTabs();
	
	// Horizontal slider control
	initSlider();	
}
