const logger = require('../../../utils/logger');
import {test, expect} from '@playwright/test';

test.describe('Web Tables Tests', () => {
    test('User can add a new row to the table', async ({page}) => {
        logger.info('Navigating to Web Tables page');
        await page.goto(`${process.env.BASE_URL}/webtables`, {waitUntil: 'networkidle'});


        logger.info('Checking visibility of addNewRecordButton');
        const isAddButtonVisible = await page.isVisible('#addNewRecordButton');
        console.log('Is addNewRecordButton visible:', isAddButtonVisible);
        if (!isAddButtonVisible) throw new Error('#addNewRecordButton is not visible');

        logger.info('Opening the registration form');
        await page.click('#addNewRecordButton');

        logger.info('Filling out the registration form');
        await page.fill('#firstName', 'Alice');
        await page.fill('#lastName', 'Smith');
        await page.fill('#userEmail', 'alice.smith@example.com');
        await page.fill('#age', '30');
        await page.fill('#salary', '100000');
        await page.fill('#department', 'Engineering');

        logger.info('Submitting the form');
        await page.click('#submit');
        logger.info('Test completed successfully');


        logger.info('Waiting for the table to update');
        await page.waitForSelector('.rt-tr-group:last-child', {state: 'visible', timeout: 5000});

        logger.info('Validating new record in the table');
        const [firstNameCell] = await Promise.all([page.locator('div:nth-of-type(1) > ' +
            'div:nth-of-type(2) > div:nth-of-type(4) > div > div:nth-of-type(1)').textContent()]);
        console.log('First name cell:', firstNameCell);
        expect(firstNameCell.trim()).toBe("Alice");
    });

});

