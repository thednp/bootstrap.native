exports.getModuleNames = function (arr) { // Normalizes an array of module names or filenames
  var regex = /([\w]+)(-native\.js)?/;
  var names = [];
  arr.forEach(function (str) {
    var name = exports.ucfirst(regex.exec(str)[1]);
    // Special Casing for ScrollSpy
    if (name === 'Scrollspy') {
      name = 'ScrollSpy';
    }
    names.push(name);
  });
  return names;
}

exports.ucfirst = function (str) {
  var cap = str.charAt(0).toUpperCase();
  return cap + str.substr(1);
},

exports.error = function (err) {
  console.error(err);
  process.exit(1);
}
