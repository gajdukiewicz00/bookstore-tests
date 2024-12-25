const logger = require('../../utils/logger');
import {test,expect} from "@playwright/test";

test.describe('Radio Button Test', ()=>{
    test('User can select a radio button', async ({page}) =>{
        logger.info('Navigating to Radio Button page');
        await page.goto(`${process.env.BASE_URL}/radio-button`, {waitUntil: 'networkidle'});

        logger.info('Selecting "Yes" radio button');
        await page.click('text=Yes');

        logger.info('Validating selection');
        const resultText = await page.locator('.text-success').textContent();
        console.log('Radio button result:',resultText);
        expect(resultText).toBe('Yes');

        logger.info('Test completed successfully')
    })
})