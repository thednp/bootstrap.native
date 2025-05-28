import { defineConfig } from "vitest/config";
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: [
      "@vitest/coverage-istanbul"
    ]
  },
  esbuild: {
    legalComments: 'inline',
  },
  build: {
    minify: 'esbuild'
  },
  test: {
    css: true,
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text", "lcov"],
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/util/init.ts"],
    },
    browser: {
      // provider: 'preview', // or 'webdriverio'
      enabled: true,
      headless: false,
      instances: [
        { browser: "chromium" }
      ]
    },
  },
});
