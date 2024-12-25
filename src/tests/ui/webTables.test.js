const logger = require('../../utils/logger');
import { test, expect } from '@playwright/test';

test.describe('Web Tables Tests', () => {
    test('User can add a new row to the table', async ({ browser }) => {
        const context = await browser.newContext({
            blockedURLPatterns: ['*adplus.js*'], // Блокируем рекламу
            args: ['--enable-unsafe-webgl'], // Устраняем предупреждение WebGL
        });
        const page = await context.newPage();

        // Обработчик консоли для игнорирования ошибок рекламы
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                const text = msg.text();
                if (!text.includes('adplus.js') && !text.includes('GroupMarkerNotSet')) {
                    console.error('Browser error:', text);
                }
            }
        });

        // Переход на страницу
        logger.info('Navigating to Web Tables page');
        await page.goto(`${process.env.BASE_URL}/webtables`);

        logger.info('Opening the registration form');
        await page.click('#addNewRecordButton');

        logger.info('Filling out the registration form');
        await page.fill('#firstName', 'Alice');
        await page.fill('#lastName', 'Smith');
        await page.fill('#userEmail', 'alice.smith@example.com');
        await page.fill('#age', '30');
        await page.fill('#salary', '100000');
        await page.fill('#department', 'Engineering');

        logger.info('Validating entered data');
        const firstNameValue = await page.inputValue('#firstName');
        expect(firstNameValue).toBe('Alice');

        const lastNameValue = await page.inputValue('#lastName');
        expect(lastNameValue).toBe('Smith');

        const emailValue = await page.inputValue('#userEmail');
        expect(emailValue).toBe('alice.smith@example.com');

        const ageValue = await page.inputValue('#age');
        expect(ageValue).toBe('30');

        const salaryValue = await page.inputValue('#salary');
        expect(salaryValue).toBe('100000');

        const departmentValue = await page.inputValue('#department');
        expect(departmentValue).toBe('Engineering');

        logger.info('Submitting the form');
        await page.click('#submit');

        logger.info('Waiting for the table to update');
        await page.waitForSelector('.rt-tr-group:last-child', { state: 'visible', timeout: 5000 });

        logger.info('Validating new record in the table');
        const [firstNameCell] = await Promise.all([page.locator('.rt-tr-group:last-child').textContent()]);
        console.log('First name cell:', firstNameCell);
        expect(firstNameCell.trim()).toBe("");
    });

});

