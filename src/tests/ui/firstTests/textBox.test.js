const logger = require('../../../utils/logger');
import {test, expect} from '@playwright/test';

test.describe('Text Box Tests', () => {
    test('User can fill and submit the Text Box form', async ({page}) => {
        logger.info('Navigating to Text Box page');
        await page.goto(`${process.env.BASE_URL}/text-box`, {waitUntil: 'networkidle'});

        logger.info('Checking visibility of userName field');
        const isUserNameVisible = await page.isVisible('#userName');
        console.log('Is userName visible:', isUserNameVisible);
        if (!isUserNameVisible) throw new Error('#userName is not visible');

        logger.info('Filling out the form');
        await page.fill('#userName', 'John Doe');
        await page.fill('#userEmail', 'johndoe@example.com');
        await page.fill('#currentAddress', '123 Main Street');
        await page.fill('#permanentAddress', '456 Secondary Street');

        logger.info('Submitting the form');
        await page.click('#submit');

        logger.info('Test completed successfully');

        logger.info('Validating results');
        const nameResult = await page.locator('#name').textContent();
        expect(nameResult).toContain('John Doe');
        const emailResult = await page.locator('#email').textContent();
        expect(emailResult).toContain('johndoe@example.com');
    });
});
