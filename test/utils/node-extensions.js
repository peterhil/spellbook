// Adapted for Buble from:
// https://jaketrent.com/post/testing-es2015-riot-tags/

const buble = require( 'buble' )
const fs = require('fs')
const path = require('path')
const requireFromString = require('require-from-string');
const riot = require('riot')

// Add riot to node env so compilation works - per https://github.com/riot/riot/issues/895
global.riot = riot

// Override behavior for riot tag import - per https://github.com/mochajs/mocha/issues/1458
require.extensions['.tag'] = function riotTagLoader (module, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  const options = { sourcemap: true }
  const riotCompiled = riot.compile(content, options, filename)

  // See https://buble.surge.sh/guide/#using-the-javascript-api
  const bubleOptions = {
    target: {
      chrome: 52,
    },
    transforms: {
      modules: false,
    },
    source: filename,
    objectAssign: 'Object.assign',
  }
  const bubleCompiled = buble.transform(riotCompiled.code, bubleOptions)

  const tag = "(function riotTag (module) {\n" +
        "var tag = " + bubleCompiled.code + ";\n" +
        "module.exports = tag; })(module)\n" // IIFE

  return requireFromString(tag, filename)
}
