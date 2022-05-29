# BSN
[![Coverage Status](https://coveralls.io/repos/github/thednp/bootstrap.native/badge.svg)](https://coveralls.io/github/thednp/bootstrap.native)
[![ci](https://github.com/thednp/bootstrap.native/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/bootstrap.native/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/bootstrap.native.svg)](https://www.npmjs.com/package/bootstrap.native)
[![NPM Downloads](https://img.shields.io/npm/dm/bootstrap.native.svg)](http://npm-stat.com/charts.html?package=bootstrap.native)
[![jsDeliver](https://img.shields.io/jsdelivr/npm/hw/bootstrap.native)](https://www.jsdelivr.com/package/npm/bootstrap.native)
[![CDNJS](https://img.shields.io/cdnjs/v/bootstrap.native.svg)](https://cdnjs.com/libraries/bootstrap.native)
![cypress version](https://img.shields.io/badge/cypress-9.7.0-brightgreen)
![typescript version](https://img.shields.io/badge/typescript-4.5.2-brightgreen)

The faster, lighter and more compact set of JavaScript components for **Bootstrap 5**, developed on modern ES6+ standards.
The **bootstrap.native** library is available on npm, CDN and comes packed with build tools and lots of goodies.


 The library is around ***30Kb*** minified (V5 ***38Kb***) and around ***10Kb*** gZipped. See <a href="http://thednp.github.io/bootstrap.native/">the demo</a> for components guidelines and examples, or the [Wiki/How to use](https://github.com/thednp/bootstrap.native/wiki/How-to-use) on how to use the library or create custom builds.

# Wiki
Please check the `bootstrap.native` Wiki pages, they're updated with almost every new commit:
* [Acknowledgements](https://github.com/thednp/bootstrap.native/wiki/Acknowledgements) - there are similarities and differences with the original jQuery plugins, good to know for maximizing your workflow.
* [How to use](https://github.com/thednp/bootstrap.native/wiki/How-to-use) - An in depth guide on how to use the library.
  * [CDN Links](https://github.com/thednp/bootstrap.native/wiki/How-to-use#load-from-cdn) - use CDN links available on [jsdelivr](https://www.jsdelivr.com/package/npm/bootstrap.native) and [cdnjs](https://cdnjs.com/libraries/bootstrap.native)
  * [Locally Hosted](https://github.com/thednp/bootstrap.native/wiki/How-to-use#working-locally) - download and copy in your project `assets/js` folder, then use proper markup to enable BSN on your pages
  * [ES5 Example](https://github.com/thednp/bootstrap.native/wiki/How-to-use#es5-basic-example) - basic component initialization with JavaScript ES5
  * [ES6+ Example](https://github.com/thednp/bootstrap.native/wiki/How-to-use#es6es7-basic-example) - modern application would like you to `import BSN from "bootstrap.native"`
  * [NPM Installation](https://github.com/thednp/bootstrap.native/wiki/How-to-use#npm) - just execute `npm install bootstrap.native` or mark it as dependency and take it from there
  * [Custom Builds](https://github.com/thednp/bootstrap.native/wiki/How-to-use#custom-builds) - use rollup build scripts to create your own custom builds, only with the components you need
  * [Dynamic Content](https://github.com/thednp/bootstrap.native/wiki/How-to-use#dynamic-content) - use the library callbacks with your `turbolinks:load`, `mount`, `load` and similar events
  * [RequireJS/CommonJS](https://github.com/thednp/bootstrap.native/wiki/How-to-use#requirejs-commonjs) - NodeJS applications would like you to `let BSN = require "bootstrap.native"` 
  * [Factory Methods](https://github.com/thednp/bootstrap.native/wiki/How-to-use#note-about-the-factory-methods) - for NodeJS apps you need to have `document` and `window` in scope
* [Browser support](https://github.com/thednp/bootstrap.native/wiki/Browser-support) - Enable legacy browsers support via polyfills.
* [FAQs](https://github.com/thednp/bootstrap.native/wiki/FAQs) - A short list of frequent asked questions regarding the use of the library.
* [About](https://github.com/thednp/bootstrap.native/wiki/About) - Learn about the `bootstrap.native` project inception, goals and motivations.

# Contributors
* Full contributors list [here](https://github.com/thednp/bootstrap.native/graphs/contributors). Thanks!

# License
The BSN library is released under the [MIT license](https://github.com/thednp/bootstrap.native/blob/master/LICENSE).
