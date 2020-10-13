// import services
const ProductService = require('../services/productService')
const InventoryService = require('../services/inventoryService')

// controllers

// admin
exports.addProduct = async (req, res) => {
    const { name, description, price, brand, category, inStock } = req.body

    const addedProduct = await ProductService.AddProduct(name, description, inStock, price, brand, category)

    const updatedInventory = await InventoryService.AddInventory(req.user._id, addedProduct._id)
    
    res.json({
        message: "Product added successfully.",
        addedProduct,
        updatedInventory
    })
}

exports.updateCategory = async (req, res) => {
    const { _id, category } = req.body

    const updatedProduct = await ProductService.UpdateProduct(_id, { category })

    res.json({
        message: "Category updated to the product.",
        updatedProduct
    })
}

// shop
exports.getProduct = async (req, res) => {
    const { _id } = req.params

    const product = await ProductService.GetProduct(_id)

    res.json({
        message: "Product info",
        product
    })
}

exports.search = async (req, res) => {
    const { searchFor } = req.params
    const { limit, caseSensitive } = req.query

    const products = await ProductService.SearchFor(searchFor, { fields: "name brand price description", limit, caseSensitive })

    res.json({
        message: "Products' info",
        products
    })
}

exports.getAllProducts = async (req, res) => {
    const productList = await ProductService.GetProducts({}, "name description brand inStock price")

    res.json({
        message: "List of available products",
        productList
    })
}