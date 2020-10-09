const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: "User ID required.",
        index: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: "Product ID required."
    }
}, {
    timestams: true
})

module.exports = mongoose.model("Inventory", inventorySchema)