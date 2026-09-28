import { test, expect} from '@playwright/test';

test.describe('Product Management Tests', () => {

    test('get product by id', async ({ request }) => {
        const response = await request.get('/products/20');

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toBe(20);
    });

    test('get product by invalid id', async ({ request }) => {
        const response = await request.get('/products/2000');
        
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message');
        expect(responseBody.message).toBe("Product with id '2000' not found");
    });

    test('search products by name', async ({ request }) => {
        const response = await request.get('/products/search?q=Cooking Oil');

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('products');
        expect(Array.isArray(responseBody.products)).toBeTruthy();
        expect(responseBody.products.length).toBeGreaterThan(0);
        expect(responseBody.products[0]).toHaveProperty('title');
        expect(responseBody.products[0].title).toBe('Cooking Oil');
    });

})