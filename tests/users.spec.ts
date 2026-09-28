import { test , expect } from '@playwright/test';

test.describe('User Management Tests', () => {

    test('get user by id', async ({ request }) => {
        const response = await request.get('/users/1');

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toBe(1);
        expect(responseBody).toHaveProperty('username');
        expect(responseBody.username).toBe('emilys');

    });

    test('get user by invalid id', async ({ request }) => {
        const response = await request.get('/users/2000');

        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message');
        expect(responseBody.message).toBe("User with id '2000' not found");
    });

    test('search users by username', async ({ request }) => {
        const response = await request.get('/users/search?username=emilys');

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('users');
        expect(Array.isArray(responseBody.users)).toBeTruthy();
        expect(responseBody.users.length).toBeGreaterThan(0);
        expect(responseBody.users[0]).toHaveProperty('username');
        expect(responseBody.users[0].username).toBe('emilys');
    });

});
