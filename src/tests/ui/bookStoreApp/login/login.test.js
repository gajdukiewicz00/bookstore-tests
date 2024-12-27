const {test, expect} = require('@playwright/test');
const logger = require('../../../../utils/logger');

test.describe('Login Tests', () =>{
    test('User can login with valid credentials', async ({page})=>{
        logger.info('Navigating to Login page');
        await page.goto(`${process.env.BASE_URL}/login`, {waitUntil: "networkidle"});

        logger.info('Filling login form with valid credentials');
        await page.fill('#userName', `${process.env.USER_NAME}`);
        await page.fill('#password', `${process.env.PASSWORD}`);
        await page.click('#login');

        logger.info('Validating successful login');
        await page.waitForTimeout(5000);
        const profileHeader = await page.locator('#userName-value').textContent();
        expect(profileHeader.trim()).toBe('testUser');
        logger.info('Login test completed successfully');
    });
});
