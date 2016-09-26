# Native Javascript for Bootstrap
This is a set of scripts developed with native Javascript for <strong>Bootstrap 3</strong> series, and featuring superior performance compared to the original jQuery Plugins. Thanks to [Ingwie Phoenix](https://github.com/IngwiePhoenix) for contributing with npm/RequireJS/CommonJS compatibility.
See <a href="http://thednp.github.io/bootstrap.native/">demo</a> for scripting examples and instructions.

# CDN
New releases will be available automatically on jsdelivr CDN repositories <a href="http://www.jsdelivr.com/#!bootstrap.native">here</a> or CDNjs repositories <a href="https://cdnjs.com/libraries/bootstrap.native">here</a>.

# Bower and NPM
You can install this package by using either Bower or NPM.

    $ npm install --save bootstrap.native
    # Or
    $ bower install --save bootstrap.native

## Subsystem compatibility
`bootstrap.native` is compatible with the CommonJS/RequireJS spec (exporting itself to `module.exports`). It thus can fall back to adding its exports to the `window` object.

# Usage
You can use the scripts either using a traditional script-tag like so:

```html
<!-- Using one of the CDN repositories-->
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.native/0.9.6/bootstrap-native.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/bootstrap.native/1.0.2/bootstrap-native.min.js"></script>
<!-- Using a local assets folder -->
<script type="text/javascript" src="/assets/bootstrap.native.min.js"></script>
<!-- Or using Bower? -->
<script type="text/javascript" src="/bower_components/bootstrap.native/dist/bootstrap-native.min.js"></script>
```

But it's also possible to use any module loader that supports the `RequireJS` or `CommonJS` syntax. An example is `RequireJS` itself:

```html
<script type="text/javascript">
    var bsn = require("bootstrap.native");
    // Create a button:
    var btn = new bsn.Button(...);
</script>
```

If you are working in a virtual browser environment, the properties of the returned exports are all functions, that expect both, a global `window` and a global `document` variable to exist before calling. An example case is during tests, where you may use NodeJS to run front-end tests. These usually will create a virtual Window and Document object. Once these exist, `bootstrap.native` will function properly.

An example of this would look like this:

```javascript
var bsn = require("bootstrap.native");
var browser = require("mock-browser");
global.window = browser.createWindow();
global.document = browser.createDocument();

// Now it's safe to use bootstrap.native and expecting the properties to be the actual component classes.
var Button = btn.Button(); // Create the button class and return it.

var $btn = document.createElement("button");
var myButton = new Button(... $btn and options ...); // Create a button and do a test.
```

## Note About the Factory Methods
As mentioned above, the object properties of the exported object, when using `require()`, are actual classes when `document` and `window` are given - in which case we are sure to be facing an actual browser - and if absent, will be factory methods.

So when using `bootstrap.native` inside of a NodeJS app, make sure you create a proper Browser-like environment first to avoid unexpected behaviour.

# Browser Support
The scripts are developed with clean code mainly for modern browsers that nativelly support HTML5. When using polyfills IE8-IE9 will thank you.

# Custom Builds
You can make a custom build of bootstrap-native, including only the modules you need, by using the `build.js` script.

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
- [Ryan Zimmerman](https://github.com/RyanZim): Custom build script.
- Full contributors list [here](https://github.com/thednp/bootstrap.native/graphs/contributors). Thanks so much!

# License
The scripts are released under the [MIT license](https://github.com/thednp/bootstrap.native/blob/master/LICENSE).
