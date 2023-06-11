// sources
// * https://github.com/enketo/enketo-express/blob/master/tools/esbuild-plugin-istanbul.js
'use strict';
import esbuild from 'esbuild';
import { promises } from 'fs';
import { createInstrumenter } from 'istanbul-lib-instrument';
import { extname, sep } from 'path';
import tsCompile from './tsCompile';

// import Cypress settings
const sourceFolder = 'src';
const [name] = process.cwd().split(sep).slice(-1);

const sourceFilter = `${name}${sep}${sourceFolder}`;
const instrumenter = createInstrumenter({
  compact: false,
  esModules: true,
  preserveComments: true,
  autoWrap: true,
});

const createEsbuildIstanbulPlugin = (): esbuild.Plugin => {
  return {
    name: 'istanbul',
    setup(build: esbuild.PluginBuild) {
      build.onLoad(
        { filter: /\.(ts|tsx)$/ },
        async ({ path }: esbuild.OnLoadArgs): Promise<{ contents: string } & Record<string, any>> => {
          
          if (!path.includes(sourceFilter)) {
            // console.log("> compiling typescript %s for output build", path);
            const contents = await promises.readFile(path, 'utf8');
            return {
              contents: ['.ts', '.tsx'].includes(extname(path)) ? tsCompile(path).outputText : contents,
            };
          }

          // console.log("🧡 instrumenting %s for output coverage", path);
          const { outputText, sourceMap } = tsCompile(path);

          return {
            contents: instrumenter.instrumentSync(outputText, path, sourceMap),
          };
        },
      );
    },
  };
};

export default createEsbuildIstanbulPlugin;
