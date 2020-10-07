const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    }
})
cartSchema.index({
    user_id: 1,
    item: -1
}, {
    timestamps: true
})


module.exports = mongoose.model("Cart", cartSchema)