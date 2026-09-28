import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html']],
  
  use: {
    baseURL: 'https://dummyjson.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
});