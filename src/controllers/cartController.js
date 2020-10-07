// import services
const CartService = require('../services/cartService')

// controllers
exports.addCart = async (req, res) => {
    const { item, quantity } = req.body

    const { _id } = req.user
    
    const addedCart = await CartService.AddCart(item, _id, quantity)
    
    res.json({
        message: "Product added to cart successfully.",
        addedCart
    })
}

exports.getCartItems = async (req, res) => {
    const { _id } = req.user

    const cartItems = await CartService.GetCartItems(_id)

    res.json({
        message: "Item(s) in the cart.",
        cartItems
    })
}

exports.checkout = async (req, res) => {
    const { items } = req.body

    const { _id } = req.user
    
    const checkoutInformation = await CartService.CheckoutCart(_id, items)

    res.json({
        message: "Checkout",
        checkoutInformation
    })
}

exports.removeItem = async (req, res) => {
    const { item } = req.params

    const { _id } = req.user

    const removedItem = await CartService.RemoveItem(_id, item)

    res.json({
        mmessage: "Item removed",
        removedItem
    })
}