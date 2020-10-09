const Database = require('../helpers/Database')

const ProductService = require('./productService')

class InventoryService extends Database {
    constructor(model) {
        super(model)
    }

    AddInventory = (user, product) => this.Add({ user, product })

    GetInventory = async user => {
        // console.log("User: ", user)
        const products = await this.RetrieveAllFiltered({ user }, "product")

        if (!products) throw "No product found"

        let productDetails = []
        let details = {}
        for (const prod of products) {
            details = await ProductService.GetProduct(prod.product)
            productDetails = [ ...productDetails, details ]
        }

        return productDetails
    }
}

module.exports = new InventoryService(require('mongoose').model("Inventory"))