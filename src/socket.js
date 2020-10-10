const socket = require('socket.io')

const io = socket()

io.on('connection', socket => {

    socket.emit("welcome", { message: `Welcome, ${socket.id}` })
})

module.exports = io