/*
const {test, expect} = require('@playwright/test');
const logger = require('../../../../utils/logger');

test.describe('New User Tests', () => {
    test('Bypass reCAPTCHA v2 with XPath', async ({ page }) => {
        await page.goto('https://demoqa.com/register');

        // Ввод данных для регистрации
        await page.fill('#firstname', 'John');
        await page.fill('#lastname', 'Doe');
        await page.fill('#userName', 'johndoe');
        await page.fill('#password', 'StrongPassword123!');

        // Найти iframe с reCAPTCHA
        const captchaFrame = page.frame({ url: /recaptcha/ }); // Используем регулярное выражение для URL iframe
        if (!captchaFrame) throw new Error('Iframe with reCAPTCHA not found.');

        // Клик по чекбоксу reCAPTCHA
        await captchaFrame.waitForSelector('#recaptcha-anchor', { timeout: 20000 });
        await captchaFrame.click('#recaptcha-anchor');

        // Ожидание появления элементов задачи
        //await captchaFrame.waitForSelector('//table[contains(@class, "rc-imageselect-table")]//td[@class="rc-imageselect-tile"]', { timeout: 20000 });
        await captchaFrame.waitForTimeout(20000);
        const tiles = await captchaFrame.$$('xpath=//td[contains(@class, "rc-imageselect-tile")]');
        if (!tiles.length) throw new Error('No tiles found for challenge.');

        console.log(`Found ${tiles.length} tiles.`);
        for (const tile of tiles) {
            // Клик по каждому элементу
            await tile.click();
        }

        // Клик по кнопке Verify
        await captchaFrame.click('#recaptcha-verify-button');

        // Подождать завершения обработки
        await page.waitForTimeout(5000);

        // Проверка успешного прохождения CAPTCHA
        const response = await captchaFrame.evaluate(() => {
            const recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');
            return recaptchaResponse ? recaptchaResponse.value : null;
        });

        if (!response) throw new Error('CAPTCHA was not solved.');

        // Клик по кнопке регистрации
        await page.click('#register');

        // Проверка успешной регистрации
        await page.waitForSelector('#name', { timeout: 10000 });
        const successMessage = await page.textContent('#name');
        expect(successMessage).toContain('User registered successfully.');

        console.log('Test completed successfully.');
    });
});
*/
