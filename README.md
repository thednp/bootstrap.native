# Native Javascript for Bootstrap
This is a library developed with native Javascript for both <strong>Bootstrap 3</strong> and <strong>Bootstrap 4</strong> series, featuring superior performance compared to the original jQuery Plugins. Thanks to [Ingwie Phoenix](https://github.com/IngwiePhoenix) for contributing with npm/RequireJS/CommonJS compatibility. A huge advantage is the size, this library is only ***20Kb*** minified and ***6.5Kb*** gZipped.

See <a href="http://thednp.github.io/bootstrap.native/">demo</a> for scripting examples and instructions.

# CDN
New releases will be available automatically on <a href="http://www.jsdelivr.com/#!bootstrap.native">jsdelivr</a> CDN repositories and CDN repositories on <a href="https://cdnjs.com/libraries/bootstrap.native">CDNjs</a> repositories. You may also find more <a href="https://www.google.com/search?q=bootstrap+native+cdn" target="_blank">Google</a> as well.

# Bower and NPM
You can install this package by using either Bower or NPM.

```
$ npm install --save bootstrap.native
# Or
$ bower install --save bootstrap.native
```

# Usage

`bootstrap.native` is UMD (Universal Module Definition) compatible. It will work correctly in CommonJS and AMD environments, but falls back to exporting to `window` in a normal `<script>` tag environment.

**Traditional script-tag example:**

```html
<!-- Using one of the CDN repositories-->
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.native/2.0.6/bootstrap-native.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.6/bootstrap-native.min.js"></script>
<!-- Using a local assets folder -->
<script type="text/javascript" src="/assets/js/bootstrap-native.min.js"></script>
<!-- Using Bower -->
<script type="text/javascript" src="/bower_components/bootstrap.native/dist/bootstrap-native.min.js"></script>
```

**Use the Bootstrap 4 version:**

```html
<!-- Using one of the CDN repositories-->
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.native/2.0.6/bootstrap-native-v4.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.6/bootstrap-native-v4.min.js"></script>
<!-- Using a local assets folder -->
<script type="text/javascript" src="/assets/js/bootstrap-native-v4.min.js"></script>
<!-- Using Bower -->
<script type="text/javascript" src="/bower_components/bootstrap.native/dist/bootstrap-native-v4.min.js"></script>
```

**Warning:** Do not use files directly from `/lib` folder! These files are just sources for the builds located in the `/dist` folder.

You can also use `bootstrap.native` in a CommonJS environment:

```js
var bsn = require("bootstrap.native");
// Create a button:
var btn = new bsn.Button(element,'loading');
```

**Note:** If you are working in a virtual browser environment (i.e. running front-end tests in NodeJS), `bootstrap.native` requires both `window` and `document` to be in scope. You will need to use a mock browser.


## Note About the Factory Methods
As mentioned above, the object properties of the exported object, when using `require()`, are actual classes when `document` and `window` are given - in which case we are sure to be facing an actual browser - and if absent, will be factory methods.

So when using `bootstrap.native` inside of a NodeJS app, make sure you create a proper Browser-like environment first to avoid unexpected behaviour.

# Browser Support
The components are developed with clean code mainly for modern browsers that nativelly support HTML5. When using polyfills, IE8-IE10 will thank you. The library comes with a custom polyfill you can use right away.

```html
<!-- Using one of the CDN repositories-->
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.native/2.0.6/polyfill.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.6/polyfill.min.js"></script>
<!-- Using a local assets folder -->
<script type="text/javascript" src="/assets/js/polyfill.min.js"></script>
<!-- Using Bower -->
<script type="text/javascript" src="/bower_components/bootstrap.native/dist/polyfill.min.js"></script>
```

# Custom Builds
You can make a custom build of bootstrap-native, including only the modules you need, by using the `build.js` and `build-v4.js` scripts.

## Usage:
```
$ node build.js --help
node build.js [--minify] [--ignore=<modules>...|--only=<modules>...]

Options:
  --minify, -m  Minify output                         [boolean] [default: false]
  --ignore, -i  Omit the given module(s) from the bundle                 [array]
  --only        Only include the given module(s) in the bundle           [array]
  --help        Show help                                              [boolean]

Running without --ignore or --only will compile all the modules.
Writes to stdout
```

\*nix users can run `./build.js` as well as `node build.js`.

# Contributors
- [Ingwie Phoenix](https://github.com/IngwiePhoenix): RequireJS/CommonJS compatibility and usability with common package managers. _Was glad to help!_
- [Ryan Zimmerman](https://github.com/RyanZim): **Amazing** custom build script.
- Full contributors list [here](https://github.com/thednp/bootstrap.native/graphs/contributors). Thanks so much!

# License
The library is released under the [MIT license](https://github.com/thednp/bootstrap.native/blob/master/LICENSE).
