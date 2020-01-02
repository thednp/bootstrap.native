'use strict'

const pkg = require('../../package.json')
const year = new Date().getFullYear()

function getMiniBanner() {
  return `/*! Native JavaScript for Bootstrap v${pkg.version} | ${year} © ${pkg.author} | MIT-License */`
}

module.exports = getMiniBanner