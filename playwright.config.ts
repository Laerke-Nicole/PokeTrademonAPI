import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://poketrademonapi.onrender.com/api',
  },
  testDir: './src/tests/playwright',
  timeout: 30000,

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5004',
    reuseExistingServer: true,
  },
});