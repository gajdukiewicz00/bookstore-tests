const {test, expect} = require('@playwright/test');
const apiClient = require('../../../utils/apiClient')

test.describe('BookStore API - GET Requests', () =>{
    const endpoint = '/BookStore/v1';
    test('GET /Books should return a list of books', async () =>{
        const response = await apiClient.get(`${endpoint}/Books`);
        expect(response.status).toBe(200);
    });
});
