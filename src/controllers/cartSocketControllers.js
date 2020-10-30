const CartService = require('../services/cartService')

exports.addCart = socket => async function(details) {
    try {
        const { item, quantity = 1 } = details

        const { _id } = socket.user

        await CartService.AddCart(item, _id, quantity)

        const cartItems = await CartService.GetCartItems(_id)

        socket.emit("cart-added", {
            cartItems: cartItems.length
        })
    } catch (e) {
        socket.emit("processing-error", {
            message: "There was am error addiing item to the cart."
        })
    }
}
exports.getCartItems = socket => async function() {
    try {
        const { _id } = socket.user

        const cartItems = await CartService.GetCartItems(_id)

        socket.emit('cart-items', {
            cartItems: cartItems.length
        })
    } catch (e) {
        socket.emit("processing-error", {
            message: "There was an error fetching cart details."
        })
    }
}