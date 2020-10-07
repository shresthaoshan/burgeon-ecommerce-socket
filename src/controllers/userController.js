// import handlers
const UserService = require('../services/userService')

// controllers
exports.register = async (req, res) => {
    const { email, name, password, role } = req.body

    const registeredUser = await UserService.Register(email, name, password, role)

    res.json({
        message: "Registration successful.",
        registeredUser
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    const token = await UserService.Login(email, password)

    res.json({
        message: "Log in successful.",
        token
    })
}