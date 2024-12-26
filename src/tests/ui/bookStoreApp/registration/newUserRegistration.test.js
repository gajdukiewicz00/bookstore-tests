/*
const { test, expect } = require('@playwright/test');
const { handleCaptcha } = require('../../../../utils/handleCaptcha');
const logger = require('../../../../utils/logger');

test.describe('New User Tests', () => {
    test('User can register a new account', async ({ page }) => {
        try {
            logger.info('Navigating to New User Registration page...');
            await page.goto('https://demoqa.com/register', { waitUntil: 'networkidle' });

            logger.info('Filling out the registration form...');
            await page.fill('#firstname', 'John');
            await page.fill('#lastname', 'Doe');
            await page.fill('#userName', 'newuser123');
            await page.fill('#password', 'Password123!');

            logger.info('Handling CAPTCHA...');
            await handleCaptcha(page);

            logger.info('Submitting the registration form...');
            await page.click('#register');

            logger.info('Validating successful registration...');
            await page.waitForSelector('#name', { timeout: 10000 });
            const successMessage = await page.locator('#name').textContent();
            expect(successMessage).toContain('User registered successfully.');
            logger.info('Test completed successfully.');
        } catch (error) {
            logger.error(`Test failed: ${error.message}`);
            throw error;
        }
    });
});
*/
