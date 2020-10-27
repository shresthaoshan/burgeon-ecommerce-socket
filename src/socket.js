const socket = require('socket.io')

const io = socket()

io.use(require('./middlewares/authSocket'))

io.on('connection', socket => {
    console.log("User Live: ", `${socket.user.name}[${socket.user.email}]`)

    socket.emit("notification", {
        message: "Welcome aboard!!"
    })
    
    socket.on('disconnect', () => console.log("A user disconnected."))
})

module.exports = io