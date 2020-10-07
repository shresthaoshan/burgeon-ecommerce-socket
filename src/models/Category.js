const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: "Category name is required."
    },
    description: {
        type: String,
        required: "Category description is required."
    }
}, {
    timestamps: true
})

categorySchema.pre('save', async function(next) {
    if (!this.isNew) return next()

    const categoryAlreadyExist = await this.constructor.findOne({ name: this.name })

    if (categoryAlreadyExist) throw "Category already exists."
    
    next()
})

module.exports = mongoose.model("Category", categorySchema)