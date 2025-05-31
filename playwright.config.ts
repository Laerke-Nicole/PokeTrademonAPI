import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  testDir: './src/tests/playwright',
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5004',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5004',
    reuseExistingServer: true,
  },
});