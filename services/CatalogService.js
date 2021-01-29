const CatalogStorage = require('../data/CatalogStorage');

class CatalogService {
    async init() {
    }

    async getProduct(id) {
        const product = await CatalogStorage.getProduct(id);
        return product;
    }

    async getAllProducts() {
        const allProducts = await CatalogStorage.getAllProducts();
        return allProducts;
    }
}

module.exports = CatalogService;