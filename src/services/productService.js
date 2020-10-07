const { search } = require('../controllers/productController')
const Database = require('../helpers/Database')

class ProductService extends Database {
    constructor(model) {
        super(model)
    }

    AddProduct = (name, description, inStock, price, brand, category) => this.Add({ name, description, inStock, price, brand, category })

    GetProduct = _id => this.RetrieveOneFiltered({_id})

    GetProducts = (filter, options) => this.RetrieveAllFiltered(filter, options)

    SearchFor = (searchItem, options) => this.Search(searchItem, { ...options })

    UpdateProduct = (_id, param) => this.UpdateRecord({ _id }, { ...param })
}

module.exports = new ProductService(require('mongoose').model("Product"))