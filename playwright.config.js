module.exports = {
    use: {
        screenshot: true,
        video: true,
        headless: false,
        viewport: { width: 1280, height: 720 },
        baseURL: 'https://demoqa.com/books',
    },
    retries: 1,
    reporter: 'list',
};
