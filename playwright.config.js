import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './src/tests',
    reporter: [['html', { outputFolder: 'playwright-report' }]],
    use: {
        baseURL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
        trace: 'on',
    },
});