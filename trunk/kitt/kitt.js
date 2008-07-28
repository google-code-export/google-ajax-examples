/*
 Knight Rider!

 TODO:
 - Use an image of the front of Kitt!
 - Add SoundManager support to play the sound ;)
*/

function Kitt(options) {
  options = options || {};
  this.frequency = options['frequency'] || 40;
  this.id = options['id'] || 'kitt';
  this.hideButtons = options['hideButtons'] || false;
  
  this.holderBackgroundColor = options['holderBackgroundColor'] || 'white';
  this.holderBorder = options['holderBorder'] || '1px solid #aaa';
  this.holderWidth = options['holderWidth'] || '300px';
  
  this.animateBackgroundColor = options['animateBackgroundColor'] || 'navy';
  this.animateWidth = options['animateWidth'] || '10%';
  this.animateHeight = options['animateHeight'] || '100%';
  
  this.init();
}

Kitt.prototype.init = function() {
  var component = document.getElementById(this.id);
  if (!component) { // attach it to the bottom of body if someone didn't set one up
    component = document.createElement('div');
    component.id = this.id;
    document.body.appendChild(component);
  }
  
  component.style.margin = '1em';
  component.style.clear = 'all';

  var buttonHTML = (!this.hideButtons) ? '<div style="float: right;"><input type="button" id="' + this.id + '-start" value="Start"/> <input type="button" id="' + this.id + '-stop" value="Stop"/></div>' : '';
  
  component.innerHTML = '<div id="' + this.id + '-holder" style="position: relative; float: left; background:' + this.holderBackgroundColor + '; border: ' + this.holderBorder + '; margin-top: 3px; padding: 1px; height: 0.8em; width: ' + this.holderWidth + '; overflow: hidden;"><div id="' + this.id + '-whoosh" style="position:relative; width: ' + this.animateWidth + '; height: ' + this.animateHeight + '; background: ' + this.animateBackgroundColor + ';"></div></div>' + buttonHTML;

  if (!this.hideButtons) {
    component.style.width = (parseInt(this.holderWidth) + 120) + 'px';
      
    var self = this;
    document.getElementById(this.id + '-start').onclick = function() {
      self.start();
    }

    document.getElementById(this.id + '-stop').onclick = function() {
      self.stop();
    }
  }
}

// Goes from 0 to 1 for half the duration and back to 0 in
// the second half.
Kitt.prototype.calculate = function(time, duration) {
  time = time % duration;
  var position = time / duration;
  if (position > 0.5) {
    position = 1 - position; // start the other way
  }
  return position * 2;
}

Kitt.prototype.start = function() {
  var self = this;
  this.interval = window.setInterval(function() {
    self.animate();
  }, this.frequency);
}

Kitt.prototype.stop = function() {
  if (this.interval) clearInterval(this.interval);
}

Kitt.prototype.animate = function() {
  var whoosh = document.getElementById(this.id + '-whoosh');
  if (whoosh) whoosh.style.left = Math.round(this.calculate(new Date(), this.frequency * 100) * 90) + '%';
}
