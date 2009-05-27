/*
 * Javascript's mechanism for inheritance
 * Allows you to add a property/method to all instances of object
*/

// Constructor for Dog
function Dog(barkNoise){
  // each created dog is passed in a value for their bark
  this.barkNoise = barkNoise;
}

Dog.prototype.bark = function() {
  alert(this.barkNoise);
};

// Each dog has 4 legs
Dog.prototype.numLegs = 4;

// Here, we create a tiny dog that yaps
var tinyDog = new Dog('Yap yap yap!!');
var bigDog = new Dog('WOOOF!!');

// Adding properties to our Dog objects
tinyDog.size = 'tiny';
bigDog.size = 'big';



var html = '<input type="button" onclick="tinyDog.bark();" value="tinyDog.bark();">';
html += '<input type="button" onclick="bigDog.bark();" value="bigDog.bark();"><br/>';
html += 'tinyDog.size = ' + tinyDog.size + '<br/>';
html += 'tinyDog.numLegs = ' + tinyDog.numLegs + '<br/>';
html += 'bigDog.size = ' + bigDog.size + '<br/>';
html += 'bigDog.numLegs = ' + bigDog.numLegs + '<br/>';

document.getElementById('content').innerHTML = html;