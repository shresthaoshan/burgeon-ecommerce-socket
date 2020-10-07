const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Product name required."
    },
    description: {
        type: String,
        default: "No description provided."
    },
    brand: {
        type: String,
        default: "No brand",
        index: true
    },
    price: {
        type: Number,
        required: "Price required.",
        min: [0, "Price cannot be negative."]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: "Category is required.",
        index: true
    },
    inStock: {
        type: Number,
        default: 0,
        min: [0, "Stock value cannot be less than 0."]
    }
}, {
    timestamps: true
})

productSchema.index({
    name: 'text',
    description: 'text'
})

module.exports = mongoose.model("Product", productSchema)