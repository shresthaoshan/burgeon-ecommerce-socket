const apiRouter = require('express').Router()

apiRouter.use('/user', require('./user'))
apiRouter.use('/products', require('./product'))
apiRouter.use('/categories', require('./categories'))
apiRouter.use('/cart', require('./cart'))
apiRouter.use('/inventory', require('./inventory'))

module.exports = apiRouter