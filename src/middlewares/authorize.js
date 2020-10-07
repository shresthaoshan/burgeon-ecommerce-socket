const jwt = require('jwt-then')

module.exports = roles => async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) throw "Access denied. Authorization token is required."

        const user = await jwt.verify(token.split(" ")[1], process.env.SECRET)

        if (roles.split(" ").indexOf(user.role) < 0) throw `Access denied. User with '${user.role}' do not have permission for this action.`

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}