import { defineConfig } from "vitest/config";
import { resolve } from 'node:path';
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },

  build: {
    minify: 'oxc',
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
      enabled: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
      ui: false,
      headless: true,
    },
  },
});
