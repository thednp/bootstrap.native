import { defineConfig, type UserConfig } from "tsdown";
import strip from "vite-plugin-strip-comments";
const pkg = await import("./package.json", { with: { type: "json" } }).then(
  (m) => m.default,
);

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];
const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
}

const year = new Date().getFullYear();
const banner = `/*!
* Bootstrap Native $package v${pkg.version} (${pkg.homepage})
* Copyright ${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";
`;
const miniBanner = `/*! Bootstrap Native $package v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License */
"use strict";`;

const baseConfig: UserConfig = {
  target: "esnext",
  exports: true,
  format: "esm",
  dts: {
    sourcemap: true,
    sideEffects: false,
  },
  sourcemap: true,
  globalName: "BSN",
  // plugins: [strip({ type: "keep-jsdoc" })],
};


export default defineConfig([
  // BSN ESM
  {
    ...baseConfig,
    clean: true,
    banner: banner.replace("$package", "ESM"),
    platform: "neutral",
    plugins: [strip({ type: "keep-jsdoc" })],
    entry: {
      index: "src/index.ts",
    },
    format: "esm" as UserConfig["format"],
    deps: {
      skipNodeModulesBundle: true,
      neverBundle: [
        "@thednp/shorty",
        '@thednp/event-listener',
        '@thednp/position-observer',
      ]
    },
    outDir: "dist/module",
    outputOptions: {
      // dir: "dist/esm",
      codeSplitting: true,
      // file: "dist/bootstrap-native.js",
    },
  },

  // BSN UMD
  {
    ...baseConfig,
    exports: false,
    minify: true,
    // target: "ES2020" as UserConfig["target"],
    plugins: [strip({ type: "none" })],
    platform: "browser",
    format: "umd",
    globalName: "BSN",
    deps: {
      // skipNodeModulesBundle: true,      
      alwaysBundle: [
        "@thednp/shorty",
        '@thednp/event-listener',
        '@thednp/position-observer',
      ],
    },
    // noExternal: [],
    banner: miniBanner.replace("$package", "UMD"),
    target: "esnext",
    entry: {
      index: "src/index.ts",
    },
    // outDir: "dist",
    outputOptions: {
      // dir: "dist",
      codeSplitting: false,
      file: "dist/bootstrap-native.min.js",
    },
  },
  ...components.map(name => {
    return {
      ...baseConfig,
      exports: true,
      banner: banner.replace("$package", capitalize(name)),
      plugins: [strip({ type: "keep-jsdoc" })],
      entry: {
        [name]: `src/components/${name}.ts`,
      },
      deps: {
        skipNodeModulesBundle: true,
        neverBundle: [
          "@thednp/shorty",
          '@thednp/event-listener',
          '@thednp/position-observer',
        ]
      },
      format: "esm" as UserConfig["format"],
      outputOptions: {
        dir: "dist/components/" + name,
        codeSplitting: true,
        // file: `dist/components/${name}.js`,
      },
    }
  })

]);
