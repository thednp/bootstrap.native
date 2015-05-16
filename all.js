// Native Javascript for Bootstrap 3 | Bulk require
// by: Ingwie Phoenix

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

module.exports = {
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
