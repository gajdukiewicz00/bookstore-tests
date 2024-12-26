const {test, expect} = require('@playwright/test');
const {login} = require('../../../../utils/auth');
const logger = require('../../../../utils/logger');

test.describe('BookStore UI Tests with Authorization', () => {
    test('Verify book exists in the Book Store table', async ({page}) => {
        logger.info('Navigating to BookStore page');

        await login(page, 'testuser', 'Password123!');

        await page.goto(`${process.env.BASE_URL}/books`, {waitUntil: 'networkidle'});

        logger.info('Validating that the book "Git Pocket Guide" is present in the table');
        const bookLocator = page.locator('text=Git Pocket Guide');
        expect(await bookLocator.isVisible()).toBeTruthy();

        logger.info('Test completed successfully');
    });
});
