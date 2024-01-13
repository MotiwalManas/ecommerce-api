const request = require('supertest');
const app = require('../app.js');

describe('Product Routes', () => {
    let productId;

    test('POST /products - Create a new product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Test Product',
                description: 'Test Description',
                price: 19.99,
                variants: [
                    { name: 'Variant 1', sku: 'SKU123', additionalCost: 5.0, stockCount: 50 },
                    { name: 'Variant 2', sku: 'SKU456', additionalCost: 0.0, stockCount: 100 },
                ],
            })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Product');

        productId = response.body.id;
    });


    test('PUT /products/:id - Update an existing product', async () => {
        const response = await request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Updated Product',
                description: 'Updated Description',
                price: 29.99,
                variants: [{ name: 'Updated Variant', sku: 'SKU789', additionalCost: 8.0, stockCount: 75 }],
            })
            .expect(200);

        expect(response.body.name).toBe('Updated Product');
        expect(response.body.variants).toHaveLength(1);
        expect(response.body.variants[0].name).toBe('Updated Variant');
    });


    test('DELETE /products/:id - Delete an existing product', async () => {
        const response = await request(app)
            .delete(`/products/${productId}`)
            .expect(200);

        expect(response.body.id).toBe(productId);
    });


    test('GET /products - Retrieve all products', async () => {
        const response = await request(app)
            .get('/products')
            .expect(200);

        expect(response.body).toHaveLength(0);
    });
});
