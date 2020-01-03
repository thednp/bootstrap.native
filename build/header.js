'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner() {
  return `/*!
  * Native JavaScript for Bootstrap v${pkg.version} (${pkg.homepage})
  * Copyright 2015-${year} © ${pkg.author}
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */`
}

module.exports = getBanner