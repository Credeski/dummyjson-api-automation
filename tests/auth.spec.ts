import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {

    test('should successfully log in with valid credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
        data: {
            username: 'emilys',
            password: 'emilyspass',
        },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody.accessToken).toBeTruthy();
    });

    test('should fail to log in with invalid credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
        data: {
            username: 'adam',
            password: 'emilyspass',
        },
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Invalid credentials');
    expect(responseBody.user).toBeUndefined();
    });

    test('should fail to log in with missing credentials', async ({ request }) => {
    const response = await request.post('/auth/login', {
        data: {
            username: '',
            password: '',
        },
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Username and password required');
    expect(responseBody.user).toBeUndefined();
    });

})