import { test, expect } from '@playwright/test';

test.describe('Cart Management Tests', () => {
    
    test('create a new cart', async ({ request }) => {
        const response = await request.post('/carts/add', {
            data: {
                userId: 1,
                products: [
                    { id: 144, quantity: 4 },
                    { id: 98, quantity: 1 },
                ],
            },
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('userId');
        expect(responseBody.userId).toBe(1);
        expect(responseBody).toHaveProperty('products');
        expect(Array.isArray(responseBody.products)).toBeTruthy();
        expect(responseBody.products.length).toBe(2);
    });

    test('get cart by id', async ({ request }) => {
        const response = await request.get('/carts/user/1');

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('carts');
        expect(Array.isArray(responseBody.carts)).toBeTruthy();
        expect(responseBody.carts.length).toBeGreaterThan(0);

        const cart = responseBody.carts[0];

        expect(cart.id).toBe(1);
        expect(cart.userId).toBe(1);
        expect(cart).toHaveProperty('products');
        expect(cart.products[0].total).toBe(119.96);
    });

})
