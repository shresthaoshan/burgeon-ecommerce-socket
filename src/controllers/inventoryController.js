const Inventory = require('../services/inventoryService')
const jwt = require('jwt-then')

exports.addInventory = async (req, res) => {
    const { user, product } = req.body

    const addedInventory = await Inventory.AddInventory(user, product)

    res.json({
        message: "Inventory added successfully,",
        addedInventory
    })
}

exports.getProducts = async (req, res) => {
    const { _id } = req.user
    
    const products = await Inventory.GetInventory(_id)

    res.json({
        message: "Products by seller",
        products
    })
}