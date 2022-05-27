// sources
// * https://github.com/enketo/enketo-express/blob/master/tools/esbuild-plugin-istanbul.js

const { readFileSync } = require('fs');
const { createInstrumenter } = require('istanbul-lib-instrument');
const debug = require('debug');

// import Cypress settings
let { env: { sourceFolder } } = require('../../cypress.json');
sourceFolder = sourceFolder || 'src';
const [name] = process.cwd().split(/[\\|\/]/).slice(-1);
const sourcePath = sourceFolder.replace(/\\/g,'\/');

const sourceFilter = `${name}/${sourcePath}`;
const instrumenter = createInstrumenter({
  compact: false,
  esModules: true,
});

const esbuildPluginIstanbul = () => ({
  name: 'istanbul',
  setup(build) {
    build.onLoad({filter: /\.(js|jsx|ts|tsx)$/ },
      async ({ path }) => {
        const contents = String(readFileSync(path, 'utf8'));
        const samePath = path.replace(/\\/g, '/')

        if (!samePath.includes(sourceFilter)) {
          return { contents };
        }
        debug('instrumenting %s for output coverage', path);
        const instrumented = instrumenter.instrumentSync(contents, path);

        return { contents: instrumented };
      }
    );
  },
});

module.exports = esbuildPluginIstanbul;
