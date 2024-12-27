import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './src/tests',
    timeout: 30000,
    retries: 1,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report' }],
    ],
    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        trace: 'on',
    },
});

