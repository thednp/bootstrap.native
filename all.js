// Native Javascript for Bootstrap 3 | Bulk require
// by dnp_theme
// Require/npm/Bower by Ingwie Phoenix

/**
    @file This file bulk-requires all the native components and
          gives it back as the exports.

          Due to the NodeJS-y environment, each entry is a factory
          function. Once called, it expects a global `window` and
          `document` object to be present.

          I.e.:
          ```javascript
          global.window = require("web-like-environment");
          global.document = window.document;
          // Now, window and document are available.
          var modal = require("bootstrap.native").modal();
          ```
*/

// Collection of all the bootstrap.native modules.
var bsn = {
    affix:      require("./lib/affix-native"),
    alert:      require("./lib/alert-native"),
    button:     require("./lib/button-native"),
    carousel:   require("./lib/carousel-native"),
    collapse:   require("./lib/collapse-native"),
    dropdown:   require("./lib/dropdown-native"),
    modal:      require("./lib/modal-native"),
    popover:    require("./lib/popover-native"),
    scrollspy:  require("./lib/scrollspy-native"),
    tab:        require("./lib/tab-native"),
    tooltip:    require("./lib/tooltip-native")
};

/**
 * Turn the first character into an uppercase character.
 * 
 * @param {String} str      Input string
 * @returns {String}        String with uppercase starting letter.
 */
function ucfirst(str) {
    var cap = str.charAt(0).toUpperCase();
    return cap+str.substr(1);
}

/**
 * This self-executing function takes all the key names from the Bootstrap Native modules
 * and assigns the original and uppercased key.
 * 
 * This allows scripts used to the Uppercase module names to function with CommonJS.
 * 
 * @fixes #33
 * @returns Object
 */
module.exports = (function BSNExporter(){
    var _exports = {};
    for(var component in bsn) {
        var key1 = component;
        var key2 = ucfirst(component);
        _exports[key1] = _exports[key2] = bsn[component];
    }
    return _exports;
})();
