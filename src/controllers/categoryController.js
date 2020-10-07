// import services
const CategoryService = require('../services/categoryService')

// controllers
// admin
exports.addCategory = async (req, res) => {
    const { name, description } = req.body

    const addedCategory = await CategoryService.AddCategory(name, description)

    res.json({
        message: "Category added successfully",
        addedCategory
    })    
}

exports.availableCategories = async (req, res) => {
    const categories = await CategoryService.GetAllCategories()

    res.json({
        message: "All categories",
        categories
    })
}

exports.getCategory = async (req, res) => {
    const { category } = req.params

    const categoryInfo = await CategoryService.GetCategoryInfo(category)

    const products = await CategoryService.GetCategoryProducts(categoryInfo._id)

    res.json({
        message: `Category: ${category}`,
        categoryInfo,
        products
    })
}