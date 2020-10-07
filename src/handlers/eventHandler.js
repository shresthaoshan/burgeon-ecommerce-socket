const events = require('events')
const EventHandler = new events.EventEmitter()

const EmailService = require('../services/mailService')
const UserService = require('../services/userService')
const ProductService = require('../services/productService')

EventHandler.on("checkout", async event => {
    const { user, cartItems, totalAmount } = event

    const userDetails = await UserService.Profile(user)

    let itemDetails = {}
    let items = []
    for (const item of cartItems) {
        itemDetails = await ProductService.GetProduct(item.item)
        items.push({
            name: itemDetails.name,
            price: itemDetails.price,
            quantity: item.quantity
        })
    }
    
    await EmailService.Prepare({ userDetails, items, totalAmount })

    const sentMail = await EmailService.Send(userDetails.email)

    console.log(sentMail)
})

module.exports = EventHandler