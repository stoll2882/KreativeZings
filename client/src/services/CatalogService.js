import baseUrl from '../baseurl';
var axios = require('axios');

export default class CatalogService {

    static async getAllProducts() {
        try {
            const productCatalogResponse = await axios.get(baseUrl() + 'catalog');
            const productCatalog = productCatalogResponse.data;
            console.log("CATALOGSERVICE(getAllProducts): Retreieved catalog of "+productCatalog.length+" items");
            return productCatalog;
        } catch(error) {
            console.log("CATALOGSERVICE(getAllProducts): Failed getting catalog. Error="+error);
            return [];
        }
    }

}