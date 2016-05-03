// Native Javascript for Bootstrap 3 | Alert
// by dnp_theme

(function(factory){

  // CommonJS/RequireJS and "native" compatibility
  if(typeof module !== "undefined" && typeof exports == "object") {
    // A commonJS/RequireJS environment
    if(typeof window != "undefined") {
      // Window and document exist, so return the factory's return value.
      module.exports = factory();
    } else {
      // Let the user give the factory a Window and Document.
      module.exports = factory;
    }
  } else {
    // Assume a traditional browser.
    window.Alert = factory();
  }

})(function(root){

  // ALERT DEFINITION
  // ===================
  var Alert = function( element ) {
    this.btn = typeof element === 'object' ? element : document.querySelector(element);
    this.alert = null;
    this.duration = 150; // default alert transition duration
    this.init();
  }

  // ALERT METHODS
  // ================
  Alert.prototype = {

    init : function() {
      this.actions();
      document.addEventListener('click', this.close, false); //delegate to all alerts, including those inserted later into the DOM
    },

    actions : function() {
      var self = this;

      this.close = function(e) {
        var target = e.target;
        self.btn = target.getAttribute('data-dismiss') === 'alert' && target.className === 'close' ? target : target.parentNode;
        self.alert = self.btn.parentNode;

        if ( self.alert !== null && self.btn.getAttribute('data-dismiss') === 'alert' && /in/.test(self.alert.className) ) {
          self.alert.className = self.alert.className.replace(' in','');
          setTimeout(function() {
            self.alert && self.alert.parentNode.removeChild(self.alert);
          }, self.duration);
        }

      }
    }
    }

  // ALERT DATA API
  // =================
    var Alerts = document.querySelectorAll('[data-dismiss="alert"]'), i = 0, all = Alerts.length;
  for (i;i<all;i++) {
    new Alert(Alerts[i]);
  }

  return Alert;

});
