/*
const playwright = require('playwright');
const axios = require('axios');

// Your 2Captcha API Key
const apiKey = `${process.env.CAPTCHA_API_KEY}`;

// target URL with reCAPTCHA
const url = "https://demoqa.com/register";

(async () => {
    // Start Playwright and open the browser
    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the target URL
    await page.goto(url);

    // Wait for the CAPTCHA iframe
    const captchaFrame = await page.waitForSelector("iframe[src*='recaptcha']");

    // Switch to the CAPTCHA iframe
    const captchaFrameContent = await captchaFrame.contentFrame();

    // Extract the site key from the iframe's source
    const siteKey = await captchaFrame.getAttribute('src');
    const siteKeyMatch = siteKey.match(/k=([a-zA-Z0-9_-]+)/);
    const siteKeyValue = siteKeyMatch ? siteKeyMatch[1] : null;

    if (!siteKeyValue) {
        console.error("Could not extract site key.");
        await browser.close();
        return;
    }

    // Get the CAPTCHA checkbox element and click it
    const captchaCheckbox = await captchaFrameContent.waitForSelector("#recaptcha-anchor");
    await captchaCheckbox.click();

    // Solve CAPTCHA using the 2Captcha API
    const response = await axios.post('http://2captcha.com/in.php', null, {
        params: {
            key: apiKey,
            method: 'userrecaptcha',
            googlekey: siteKeyValue,
            pageurl: url
        }
    });

    const requestId = response.data.request;

    // Poll the 2Captcha API until the CAPTCHA is solved
    let captchaToken = null;
    while (!captchaToken) {
        const result = await axios.get('http://2captcha.com/res.php', {
            params: {
                key: apiKey,
                action: 'get',
                id: requestId
            }
        });

        if (result.data.status === 1) {
            captchaToken = result.data.request;
        } else {
            console.log('Waiting for CAPTCHA solution...');
            await new Promise(resolve => setTimeout(resolve, 5000));  // Wait 5 seconds before retrying
        }
    }

    console.log('Captcha solved, token:', captchaToken);

    // Fill in the CAPTCHA response in the hidden input field
    await page.evaluate((captchaToken) => {
        document.querySelector("#g-recaptcha-response").value = captchaToken;
    }, captchaToken);

    // Optional: Take a screenshot of the page
    await page.screenshot({ path: 'screengrab.png' });

    // Optionally, submit the form or perform other actions
    // For example, trigger a form submission:
    // await page.click('#submit-button-selector');

    // Wait for a while to observe the result
    await page.waitForTimeout(5000);

    // Close the browser
    await browser.close();
})();
*/
