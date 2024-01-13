const { Product, Variant } = require('../models/productModel.js');

describe('Product Model', () => {
    test('Create a new Product', () => {
        const product = new Product(1, 'Test Product', 'Description', 29.99, [
            new Variant('Variant 1', 'SKU123', 5.0, 50),
            new Variant('Variant 2', 'SKU456', 0.0, 100),
        ]);

        expect(product.id).toBe(1);
        expect(product.name).toBe('Test Product');
        expect(product.description).toBe('Description');
        expect(product.price).toBe(29.99);
        expect(product.variants).toHaveLength(2);
        expect(product.variants[0]).toBeInstanceOf(Variant);
        expect(product.variants[1]).toBeInstanceOf(Variant);
    });
});

describe('Variant Model', () => {
    test('Create a new Variant', () => {
        const variant = new Variant('Variant 1', 'SKU123', 5.0, 50);

        expect(variant.name).toBe('Variant 1');
        expect(variant.sku).toBe('SKU123');
        expect(variant.additionalCost).toBe(5.0);
        expect(variant.stockCount).toBe(50);
    });
});
