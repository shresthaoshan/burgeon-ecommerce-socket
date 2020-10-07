const Database = require('../helpers/Database')

const ProductService = require('./productService')
const EventHandler = require('../handlers/eventHandler')

class CartService extends Database {
    constructor(model) {
        super(model)
    }

    AddCart = async (item, user, quantity) => {
        try {
            const existingCart = await this.RetrieveOneFiltered({ user, item })
            
            const updatedQuantity = existingCart.quantity + quantity
        
            return this.UpdateRecord({ _id: existingCart._id }, { quantity: updatedQuantity }, { new: true })
        } catch (e) {
            if (e == 'No record found.') return this.Add({ item, user, quantity })
            else throw e
        }
    }

    GetCartItems = user => this.RetrieveAllFiltered({ user })

    RemoveItem = (user, item) => this.Remove({ user, item })

    CheckoutCart = async (user, items) => {
        let cartItems = []
        for (const item of items) cartItems.push(await this.RemoveItem(user, item))

        let totalAmount = 0
        let itemDetails = {}
        for (let cartItem of cartItems) {            
            // get product details
            itemDetails = await ProductService.GetProduct(cartItem.item)

            // update total cost of the cart
            totalAmount += (itemDetails.price * cartItem.quantity)
            
            const inStock = itemDetails.inStock - cartItem.quantity
            if (inStock < 0) throw "Stock underflow"

            // update product's stock value
            await ProductService.UpdateProduct(itemDetails._id, { inStock })
        }

        // fire checkout event
        EventHandler.emit("checkout", { user, cartItems, totalAmount })

        return { cartItems, totalAmount }
    }
}

module.exports = new CartService(require('mongoose').model("Cart"))