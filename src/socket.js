const socket = require('socket.io')

const cartControllers = require('./controllers/cartSocketControllers')

const io = socket()

io.use(require('./middlewares/authSocket'))

io.on('connection', async socket => {
    console.log("User Live: ", `${socket.user.name}[${socket.user.email}]`)

    await cartControllers.getCartItems(socket)()

    socket.on("add-cart", data => cartControllers.addCart(socket)(data))

    socket.on('disconnect', () => console.log("A user disconnected."))
})

module.exports = io