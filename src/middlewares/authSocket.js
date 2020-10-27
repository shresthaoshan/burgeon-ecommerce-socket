const jwt = require('jwt-then')

module.exports = async (socket, next) => {
    try {
        const { token } = socket.handshake.query
        if (!token) throw "Access denied. Authorization token is required."

        const user = await jwt.verify(token, process.env.SECRET)

        socket.user = user

        next()
    } catch (e) {
        console.log("Auth failed.")
    }
}