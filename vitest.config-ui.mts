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
      // provider: 'webdriverio', // or 'webdriverio'
      enabled: true,
      headless: false,
      name: 'chromium', // browser name is required
    },
  },
});
