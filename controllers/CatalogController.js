const CatalogService = require('../services/CatalogService');
const sanitize = require("mongo-sanitize");

function setupRoutes(app) {

    app.get("/catalog", async function (req, res) {
        var catalogService = new CatalogService();
        try {
            await catalogService.init();
            const allProducts = await catalogService.getAllProducts();
            res.send(allProducts).status(200).end();
        } catch(error) {
            console.log("CATALOGCONTROLLER(getAll): Get all failed with error="+error);
            res.send.status(500).end();
        }
    });

    app.get("/catalog/:id", async function (req, res) {
        var productId = sanitize(req.params["id"]);
        var catalogService = new CatalogService();
        try {
            await catalogService.init();
            const foundProduct = await catalogService.getProduct(productId);
            if(foundProduct == null) {
                res.status(404).end();
            } else {
                res.send(foundProduct).status(200).end();
            }
        } catch(error) {
            console.log("CATALOGCONTROLLER(getProduct): Get for id="+productId+" failed with error="+error);
            res.send.status(500).end();
        }
    });    
}

module.exports = { setupRoutes };