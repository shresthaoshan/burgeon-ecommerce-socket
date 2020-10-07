const cartRouter = require('express').Router()

const cartController = require('../../controllers/cartController')

const { catchErrors } = require('../../handlers/errorHandlers')

const authorize = require('../../middlewares/authorize')

cartRouter.post('/addCart', authorize("user"), catchErrors(cartController.addCart))
cartRouter.get('/getCartItems', authorize("user"), catchErrors(cartController.getCartItems))
cartRouter.post('/checkout', authorize("user"), catchErrors(cartController.checkout))
cartRouter.delete('/removeItem/:item', authorize("user"), catchErrors(cartController.removeItem))

module.exports = cartRouter
