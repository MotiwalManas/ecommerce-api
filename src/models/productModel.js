class Product {
    constructor(id, name, description, price, variants = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.variants = variants;
    }
}

class Variant {
    constructor(name, sku, additionalCost, stockCount) {
        this.name = name;
        this.sku = sku;
        this.additionalCost = additionalCost;
        this.stockCount = stockCount;
    }
}

module.exports = { Product, Variant };
