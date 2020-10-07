const userRouter = require('express').Router()
const userController = require('../../controllers/userController')

const { catchErrors } = require('../../handlers/errorHandlers')

userRouter.post('/register', catchErrors(userController.register))
userRouter.post('/login', catchErrors(userController.login))

module.exports = userRouter
