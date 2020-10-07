const productRouter = require('express').Router()
const productController = require('../../controllers/productController')

const { catchErrors } = require('../../handlers/errorHandlers')
const authorize = require('../../middlewares/authorize')

productRouter.post('/addProduct', authorize("admin"), catchErrors(productController.addProduct))
productRouter.patch('/updateCategory', authorize('admin'), catchErrors(productController.updateCategory))
productRouter.get('/search/:searchFor', catchErrors(productController.search))
productRouter.get('/getProduct/:_id', catchErrors(productController.getProduct))
productRouter.get('/getAllProducts', catchErrors(productController.getAllProducts))

module.exports = productRouter
