// Native Javascript for Bootstrap 3 | Alert
// by dnp_theme

// ALERT DEFINITION
// ===================
var Alert = function( element ) {
  this.btn = typeof element === 'object' ? element : document.querySelector(element);
  this.alert = null;
  this.duration = 150; // default alert transition duration

  var self = this;

  this.close = function(e) {
    var target = e.target;
    self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
    self.alert = self.btn.parentNode;

    if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && /\bin/.test(self.alert.className) ) {
      self.alert.className = self.alert.className.replace(' in','');
      setTimeout(function() {
        self.alert && self.alert.parentNode.removeChild(self.alert);
      }, self.duration);
    }
  };
  document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
};

// ALERT DATA API
// =================
var Alerts = document.querySelectorAll('[data-dismiss="alert"]');
for (var e=0, all = Alerts.length; e<all; e++) {
  new Alert(Alerts[e]);
}
