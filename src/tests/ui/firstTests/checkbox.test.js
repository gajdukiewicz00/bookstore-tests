const logger = require('../../../utils/logger');
import {test, expect} from "@playwright/test";

test.describe('Checkbox Tests', () => {
    test('User can select checkbox', async ({page}) => {
        logger.info('Navigating to Checkbox page');
        await page.goto(`${process.env.BASE_URL}/checkbox`, {waitUntil: 'networkidle'});

        logger.info('Expanding the tree structure');
        await page.click('.rct-option-expand-all');

        logger.info('Selecting the checkbox');
        await page.check('text=Desktop');

        logger.info('Validating selection');
        const resultText = await page.locator('#result').textContent();
        console.log('Checkbox result:', resultText);
        expect(resultText).toContain('desktop');

        logger.info('Test completed successfully');
    });
});
