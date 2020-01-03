'use strict'

const pkg = require('../../package.json')
const year = new Date().getFullYear()

function getMiniBanner() {
  return `// Native JavaScript for Bootstrap v${pkg.version} | ${year} © ${pkg.author} | ${pkg.license}-License\n`
}

module.exports = getMiniBanner