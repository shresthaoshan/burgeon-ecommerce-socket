const categoryRouter = require('express').Router()
const categoryController = require('../../controllers/categoryController')

const { catchErrors } = require('../../handlers/errorHandlers')
const authorize = require('../../middlewares/authorize')

categoryRouter.get('/', catchErrors(categoryController.availableCategories))
categoryRouter.post('/addCategory', authorize('admin'), catchErrors(categoryController.addCategory))
categoryRouter.get('/:category', catchErrors(categoryController.getCategory))

module.exports = categoryRouter
