const inventoryRouter = require('express').Router()

const inventoryController = require('../../controllers/inventoryController')

const { catchErrors } = require('../../handlers/errorHandlers')

const authorize = require('../../middlewares/authorize')

inventoryRouter.post('/addInventory', authorize("admin"), catchErrors(inventoryController.addInventory))
inventoryRouter.get('/', authorize("admin"), catchErrors(inventoryController.getProducts))

module.exports = inventoryRouter