const { Product, Variant } = require('../models/productModel');

let products = [];

const createProduct = (req, res) => {
    try {
        const { name, description, price, variants } = req.body;


        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Name, description, and price are required fields.' });
        }

        const newProduct = new Product(
            products.length + 1,
            name,
            description,
            price,
            variants.map((v) => new Variant(v.name, v.sku, v.additionalCost, v.stockCount))
        );

        products.push(newProduct);

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { name, description, price, variants } = req.body;
        const productIndex = products.findIndex((p) => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Name, description, and price are required fields.' });
        }
        products[productIndex] = {
            ...products[productIndex],
            name,
            description,
            price,
            variants: variants.map((v) => new Variant(v.name, v.sku, v.additionalCost, v.stockCount)),
        };

        return res.status(200).json(products[productIndex]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProduct = (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex((p) => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const deletedProduct = products.splice(productIndex, 1)[0];

        return res.status(200).json(deletedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProducts = (req, res) => {
    try {
        let filteredProducts = [...products];

        const { search } = req.query;

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.name.match(searchRegex) ||
                    product.description.match(searchRegex) ||
                    product.variants.some((variant) => variant.name.match(searchRegex))
            );
        }

        return res.status(200).json(filteredProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
