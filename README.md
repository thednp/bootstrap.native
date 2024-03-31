# BSN
[![Coverage Status](https://coveralls.io/repos/github/thednp/bootstrap.native/badge.svg)](https://coveralls.io/github/thednp/bootstrap.native)
[![ci](https://github.com/thednp/bootstrap.native/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/bootstrap.native/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/bootstrap.native.svg)](https://www.npmjs.com/package/bootstrap.native)
[![jsDeliver](https://img.shields.io/jsdelivr/npm/hw/bootstrap.native)](https://www.jsdelivr.com/package/npm/bootstrap.native)
[![typescript version](https://img.shields.io/badge/typescript-5.4.3-brightgreen)](https://www.typescriptlang.org/)
[![eslint version](https://img.shields.io/badge/eslint-8.57.0-brightgreen)](https://github.com/eslint)
[![cypress version](https://img.shields.io/badge/cypress-13.7.1-brightgreen)](https://www.cypress.io/)
[![vite version](https://img.shields.io/badge/vite-4.5.3-brightgreen)](https://vitejs.dev/)
[![prettier version](https://img.shields.io/badge/prettier-2.8.8-brightgreen)](https://prettier.io/)


The faster, lighter and more compact set of JavaScript components for **Bootstrap 5**, sourced with TypeScript and free from major dependecies such as jQuery, Popper.

The **bootstrap.native** library is available on npm, CDN and comes packed with Cypress powered tests and other goodies.


The library is around ***39Kb*** minified and around ***12Kb*** gZipped. See <a href="http://thednp.github.io/bootstrap.native/">the demo</a> for components guidelines and examples, or the [Wiki/How to use](https://github.com/thednp/bootstrap.native/wiki/How-to-use) on how to install and use the library.


# Wiki
Check out the `bootstrap.native` Wiki pages, they're updated with almost every new commit:
* [Acknowledgements](https://github.com/thednp/bootstrap.native/wiki/Acknowledgements) - there are similarities and differences with the original library, good to know for maximizing your workflow.
* [How to use](https://github.com/thednp/bootstrap.native/wiki/How-to-use) - An in depth guide on how to use the library.
  * [CDN Links](https://github.com/thednp/bootstrap.native/wiki/How-to-use#load-from-cdn) - use CDN links available on [jsdelivr](https://www.jsdelivr.com/package/npm/bootstrap.native)
  * [Locally Hosted](https://github.com/thednp/bootstrap.native/wiki/How-to-use#working-locally) - download and copy in your project `assets/js` folder, then use proper markup to enable BSN on your pages
  * [ES6+ Example](https://github.com/thednp/bootstrap.native/wiki/How-to-use#es6es7-basic-example) - modern application would like you to `import BSN from "bootstrap.native"`
  * [NPM Installation](https://github.com/thednp/bootstrap.native/wiki/How-to-use#npm) - just execute `npm install bootstrap.native` or mark it as dependency and take it from there
  * [Dynamic Content](https://github.com/thednp/bootstrap.native/wiki/How-to-use#dynamic-content) - use the library callbacks with your `turbolinks:load`, `mount`, `load` and similar events
  * [RequireJS/CommonJS](https://github.com/thednp/bootstrap.native/wiki/How-to-use#requirejs-commonjs) - NodeJS applications would like you to `const BSN = require("bootstrap.native")` 
  * [Factory Methods](https://github.com/thednp/bootstrap.native/wiki/How-to-use#note-about-the-factory-methods) - for NodeJS apps you need to have `document` and `window` in scope
* [Browser support](https://github.com/thednp/bootstrap.native/wiki/Browser-support) - Enable legacy browsers support via polyfills.
* [FAQs](https://github.com/thednp/bootstrap.native/wiki/FAQs) - A short list of frequent asked questions regarding the use of the library.
* [About](https://github.com/thednp/bootstrap.native/wiki/About) - Learn about the `bootstrap.native` project, goals and motivations.


# Contributors
* Full contributors list [here](https://github.com/thednp/bootstrap.native/graphs/contributors). Thanks!


# License
The BSN library is released under the [MIT license](https://github.com/thednp/bootstrap.native/blob/master/LICENSE).
