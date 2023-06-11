import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import createEsbuildIstanbulPlugin from './cypress/plugins/esbuild-istanbul';
import coverage from '@cypress/code-coverage/task';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await coverage(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildIstanbulPlugin()],
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    setupNodeEvents,
  },
});
