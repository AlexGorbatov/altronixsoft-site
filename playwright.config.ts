import { defineConfig } from "@playwright/test";

// Run against an already started dev or production server; never take over its port.
export default defineConfig({
  testDir: "./tests/responsive",
  timeout: 180_000,
  expect: { timeout: 10_000 },
  workers: 2,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    actionTimeout: 15_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROME_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH }
      : {},
  },
  projects: [{ name: process.env.PLAYWRIGHT_BROWSER || "chromium", use: {
    browserName: (process.env.PLAYWRIGHT_BROWSER || "chromium") as "chromium" | "firefox" | "webkit",
  } }],
});
