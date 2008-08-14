/*
 * KeyBindings - events and keys are your friend
 */
 
/*
 * Tie into ? and ESCAPE
 */
document.onkeypress = function(e) {
    if (e.charCode == Key.QUESTION_MARK) {
        KeyBindingsHUD.toggle();
    } else if (e.keyCode == Key.ESCAPE) {
        KeyBindingsHUD.hide();
    } else {
        KeyBindings.actionForKey(e);
    }
}

var KeyBindings = (function() {
    var bindings = {};
    
    var findNumber = function(key) { // get the name of the key from the charCode
        for (var name in Key) {
            if (Key[name] == key) {
                return name;
            }
        }
    }
    
    return {
        add: function(binding) {
            if (typeof binding.keys == "string") { // short circuit for non-arrays
                binding.keys = [ binding.keys ];
            }
            bindings[binding.eventname] = binding;
        },
    
        remove: function(eventname) {
            bindings[eventname] = undefined;
        },
    
        html: function() {
            var html = [];
        
            for (var key in bindings) {
                if (bindings.hasOwnProperty(key)) {
                    var binding = bindings[key];
                    var keys = binding.keys.collect(function(key) {
                        return Object.isNumber(key) ? findNumber(key) : key;
                    });
                    html.push(keys.join(', ') + ': ' + binding.description);
                }
            }
        
            return html.join('<br/>');        
        },
    
        actionForKey: function(e) {
            for (var action in bindings) {
                if (bindings.hasOwnProperty(action)) {
                    var keys = bindings[action].keys;
                    keys.each(function(key) {
                        if (e.charCode == 0) {
                            if (e.keyCode == key) {
                                document.fire(action, e);
                                throw $break;                            
                            }
                        }
                        if (String.fromCharCode(e.charCode) == key) {
                            document.fire(action, e);
                            throw $break;
                        }
                    });
                }
            }
        },
    
        caseInsensitive: function(keys) {
            if (typeof keys == "string") keys = [ keys ]; // array wrap
            var newArray = [];
            keys.each(function(c) {
               newArray.push(c, c.toUpperCase()); 
            });
            return newArray;
        }
    }
})();

/*
 *
 */
var KeyBindingsHUD = (function() {
    var isShown = false;
    var headerId = '_keybindings_header';
    
    return {
        toggle: function() {
          (isShown) ? this.hide() : this.show();
        },
        show: function() {
            if (!isShown) {
                var header = $(headerId);
                if (!header) {
                    header = this.createElement();
                }
                header.innerHTML = KeyBindings.html();
                header.blindDown({duration: 0.2});
                isShown = true;
            }
        },
        hide: function() {
            if (isShown) {
                $(headerId).blindUp({duration: 0.2});
                isShown = false;
            }
        },
        createElement: function() {
            var header = document.createElement('div');
            header.id = headerId;
            header.align = 'center';
            header.style.display = 'none';
            header.style.width = '100%';
            header.style.backgroundColor = '#111111';
            header.style.color = '#eeeeee';
            header.style.fontSize = '10pt';
            header.style.paddingTop = '4px';
            header.style.paddingBottom = '4px';
            header.style.borderBottom = '1px solid #333';

            var body = document.body;
            body.insertBefore(header, body.firstChild);
            
            return $(headerId);
        }
    }
})();