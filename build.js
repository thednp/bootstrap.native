#!/usr/bin/env node
// Native Javascript for Bootstrap 3 | Build Script
// Build script to bundle the js files in lib/V3
// Usage: npm run build
// Run node build.js --help for usage instructions
// by https://github.com/RyanZim

var fs = require('fs');
var uglify = require('uglify-js');
var pack = require('./package.json');
var version = 'v' + pack.version;
var license = pack.license + '-License';
var libPath = __dirname + '/lib';
// Parse arguments:
var argv = require('yargs')
.usage('node build.js [--minify] [--ignore=<modules>...|--only=<modules>...]')
.options({
  minify: {
    alias: 'm',
    type: 'boolean',
    default: false,
    describe: 'Minify output'
  },
  ignore: {
    alias: 'i',
    type: 'array',
    describe: 'Omit the given module(s) from the bundle'
  },
  only: {
    type: 'array',
    describe: 'Only include the given module(s) in the bundle'
  }
})
.coerce(['ignore', 'only'], getModuleNames)
.help()
.epilog(`Running without --ignore or --only will compile all the modules.
Writes to stdout`)
.argv;

// Arguments Sanity Check:
if (argv.only && argv.ignore) {
  error('Error: You cannot specify both --only and --ignore.');
}

// Get a list of all modules:
var allModules = fs.readdirSync(`${libPath}/V3/`).filter(item => /-native\.js$/.test(item));

// Get a list of modules to include:
var modules = [];
if (argv.only) { // If --only, use that for modules
  modules = argv.only.filter(function (item) {
    // Validate module names:
    var valid = getModuleNames(allModules).some(name => name === item);
    if (!valid) {
      console.warn(`Warning: ${item} is not a valid module name, continuing`);
    }
    return valid;
  });
} else if (argv.ignore) { // If --ignore, filter allModules
  // Filter allModules:
  modules = getModuleNames(allModules).filter(function (item) {
    // If not in ignore list, return true:
    return argv.ignore.every(ignoreItem => ignoreItem !== item);
  });
} else { // If neither --ignore or --only, use allModules
  modules = getModuleNames(allModules);
}
// If modules is an empty array, abort
// This could happen if you passed non-module values to --only
if (modules.length === 0) {
  error(`Error: No valid module names, aborting`);
}

// Use console.warn to avoid writing to stdout
console.warn(`Building Native JavaScript for Bootstrap 3 ${version} ..`);
if (argv.minify) {
  console.warn('Minified Build');
} else {
  console.warn('Unminified Build');
}
console.warn(`Included modules:
  ${modules.join('\n  ')}`);

// Load modules:
// Use Promises to avoid race conditions
var promises = [];
modules.forEach(function (name, i) {
  promises[i] = new Promise(function (resolve, reject) {
    fs.readFile(`${libPath}/V3/${name.toLowerCase()}-native.js`, 'utf8', function (err, contents) {
      if (err) reject(err);
      resolve(contents);
    });
  });
});
// When all modules are loaded, make bundle:
Promise.all(promises)
.then(function (modules) {
  var header = '// Native Javascript for Bootstrap 3 ' + version + ' | © dnp_theme | ' + license + '\n';
  var bundle = wrap(modules.join(''));
  if (argv.minify) {
    bundle = uglify.minify(bundle, {fromString: true}).code;
  }
  var output = header + bundle + '\n';
  process.stdout.on('error', function (err) {
    throw err; // Will be caught below
  });
  process.stdout.write(output, 'utf8');
})
.catch(error);

function wrap(main) {
  var utils = fs.readFileSync(`${libPath}/V3/utils.js`, 'utf8').split('\n').join('\n  '); // Indentation
  main = main.split('\n').join('\n  '); // Indentation
  // Initialize arrays:
  // Arrays will be used in the template literal below
  var rootAttachments = [];
  var returns = [];
  // Populate arrays:
  modules.forEach(function (name) {
    rootAttachments.push(`root.${name} = bsn.${name};`);
    returns.push(`${name}: ${name}`);
  });
  // Custom UMD Template:
  return `(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    ${rootAttachments.join('\n    ')/* add indentation */}
  }
}(this, function () {
  ${utils}
  ${main}
  return {
    ${returns.join(',\n    ')/* add indentation and comma */}
  };
}));`;
  // End of Template
}

// Helper Functions:
function getModuleNames(arr) { // Normalizes an array of module names or filenames
  var regex = /([\w]+)(-native\.js)?/;
  var names = [];
  arr.forEach(function (str) {
    var name = ucfirst(regex.exec(str)[1]);
    // Special Casing for ScrollSpy
    if (name === 'Scrollspy') {
      name = 'ScrollSpy';
    }
    names.push(name);
  });
  return names;
}
function ucfirst(str) {
  var cap = str.charAt(0).toUpperCase();
  return cap + str.substr(1);
}
function error(err) {
  console.error(err);
  process.exit(1);
}
