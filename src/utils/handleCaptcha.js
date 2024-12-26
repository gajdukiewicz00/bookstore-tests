/*
const logger = require('./logger');

async function handleCaptcha(page) {
    try {
        logger.info('Locating CAPTCHA iframe...');
        const iframeElement = await page.locator('iframe[title="reCAPTCHA"]').elementHandle();
        const iframe = await iframeElement.contentFrame();
        if (!iframe) {
            throw new Error('CAPTCHA iframe not found.');
        }

        logger.info('Clicking on CAPTCHA checkbox...');
        const checkbox = await iframe.locator('.recaptcha-checkbox');
        await checkbox.click();

        logger.info('Checking if CAPTCHA checkbox is checked...');
        const isChecked = await checkbox.getAttribute('aria-checked');
        if (isChecked === 'true') {
            logger.info('CAPTCHA solved via checkbox interaction.');
            return;
        }

        logger.info('Fetching sitekey...');
        const sitekey = await iframe.locator('.g-recaptcha').evaluate((el) => el.getAttribute('data-sitekey'));
        if (!sitekey) {
            throw new Error('reCAPTCHA sitekey not found.');
        }

        logger.info(`Sitekey retrieved: ${sitekey}`);
        const pageUrl = page.url();

        logger.info('Solving CAPTCHA via 2Captcha...');
        const captchaSolution = await solveCaptcha(sitekey, pageUrl);

        logger.info('Injecting CAPTCHA solution...');
        await iframe.locator('#g-recaptcha-response').evaluate((el, solution) => {
            el.value = solution;
        }, captchaSolution);

        logger.info('Submitting CAPTCHA solution...');
        await page.waitForTimeout(5000); // Wait for server validation

        logger.info('CAPTCHA handled successfully.');
    } catch (error) {
        logger.error(`Error while handling CAPTCHA: ${error.message}`);
        throw error;
    }
}
module.exports = { handleCaptcha };
*/
