const Database = require('../helpers/Database')

const ProductService = require('../services/productService')

class CategoryService extends Database {
    constructor(model) {
        super(model)
    }

    AddCategory = (name, description) => this.Add({ name, description})

    GetAllCategories = () => this.RetrieveAll({}, "name")

    GetCategoryInfo = name => this.RetrieveOneFiltered({name})

    GetCategoryProducts = _id => ProductService.GetProducts({ category: _id }, "name brand description price") || []
}

module.exports = new CategoryService(require('mongoose').model("Category"))