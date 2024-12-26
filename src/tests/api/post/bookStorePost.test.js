const { test, expect } = require('@playwright/test');
const apiClient = require('../../../utils/apiClient');

test.describe('BookStore API - POST Requests', () => {
    const endpoint = '/Account/v1';

    test('POST /GenerateToken should create a valid token', async () => {
        try {
            const requestBody = {
                userName: 'testuser',
                password: 'Password123!',
            };

            console.log('Request URL:', `${process.env.BASE_URL}${endpoint}/GenerateToken`);
            const response = await apiClient.post(`${endpoint}/GenerateToken`, requestBody);
            expect(response.status).toBe(200);

            const token = response.data.token;
            console.log('Generated Token:', token);
            expect(token).toBeTruthy();
        } catch (error) {
            console.error('Error status:', error.response?.status);
            console.error('Error data:', error.response?.data);
            throw error;
        }
    });
});