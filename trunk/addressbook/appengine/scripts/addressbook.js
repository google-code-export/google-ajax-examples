// -- Configuration and Storage
var contactCurrent;
var contactCurrentIndex;
var savedContact = {};
var contactHolder;

var slider;
var slide = false;
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
    var that = this;
    new Ajax.Request('/loadcontacts', {
      method: 'get',
      onSuccess: function(transport) {
        eval(transport.responseText); // load the contacts

        that.contacts = {}; // start so fresh and so clean

        for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i];
          if (!that.contacts[contact.id]) that.contacts[contact.id] = new Contact();
          that.contacts[contact.id].add(contact);
        }

      	// Display tabs
      	initTabs();

      	// Horizontal slider control
      	if (!slide) {
      	  initSlider();	
      	  slide = true;
    	  } else {
    	    select($('id' + contactCurrent.get(1).id), true); // reload away
    	  }
      }
    });
  },
  
  names: function() {
    var names = {};
    for (var i in this.contacts) {
      var contact = this.contacts[i].current();
      names[contact.id] = contact.name;
    }
    return names;
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
      var matches = contact['timestamp'].match(/(\d{4})-(\d{2})-(\d{2})/);

	    var date = Date.parse(contact['timestamp']);
	    $(key).innerHTML = 'Created: ' + matches[2] + '/' + matches[3] + '/' + matches[1];
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

  new Ajax.Request('/savecontact', {
    method: 'post',
    parameters: newContact,
    onSuccess: function(transport) {
      contactHolder.load();
    } 
  });  
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
  // setup the contact database
	contactHolder = new ContactHolder();	
}
