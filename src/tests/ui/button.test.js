const logger = require('../../utils/logger')
import {test, expect} from "@playwright/test";

test.describe("Button Test",()=>{
    test('User can interact with buttons', async ({page}) =>{
        logger.info('Navigating to Buttons page');
        await page.goto(`${process.env.BASE_URL}/buttons`, { waitUntil: 'networkidle'});

        logger.info('Double clicking the button');
        await page.dblclick('text=Double Click Me');
        const doubleClickButton = await page.locator('#doubleClickMessage').textContent();
        console.log('Double click message:', doubleClickButton);
        expect(doubleClickButton).toContain('You have done a double click');

        logger.info('Right clicking the button');
        await page.click('text=Right Click Me', {button: 'right'});
        const rightClickMessage = await page.locator('#rightClickMessage').textContent();
        console.log('Right click message:',rightClickMessage);
        expect(rightClickMessage).toContain('You have done a right click');

        logger.info('Test completed successfully');

    })
})