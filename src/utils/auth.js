const logger = require('./logger');

async function login(page, username, password) {
    logger.info(`Logging in with username: ${username, password}`);
    await page.goto(`${process.env.BASE_URL}/login`, {waitUntil: 'networkidle'});

    await page.fill('#userName', `${process.env.USER_NAME}`);
    await page.fill('#password', `${process.env.PASSWORD}`);
    await page.click('#login');

    const profileHeader = await page.locator('#userName-value').textContent();
    if (profileHeader.trim() !== 'testUser') {
        throw new Error('Login failed!');
    }

    logger.info('Login completed successfully');
}

module.exports = {login};
