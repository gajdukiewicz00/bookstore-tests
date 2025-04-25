class BookPage {
    constructor(page) {
        this.page = page;
        this.bookList = '.rt-tbody .rt-tr-group';
    }

    async goto() {
        await this.page.goto('/books');
    }

    async getBooksCount() {
        return await this.page.locator(this.bookList).count();
    }

}

module.exports = { BookPage };
