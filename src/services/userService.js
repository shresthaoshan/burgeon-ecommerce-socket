const Database = require('../helpers/Database')

const jwt = require('jwt-then')
const bcrypt = require('bcrypt')


class UserService extends Database {
    constructor(model) {
        super(model)
    }

    Register = async (email, name, password, role) =>
        this.Add({ email, name, password, role })
    
    Login = async (email, password) => {
        const user = await this.RetrieveOne({ email })

        if (!user) throw "User not found with that email."

        const passwordMatched = await bcrypt.compare(password, user.password)

        if (!passwordMatched) throw "Password incorrect."
        
        const token = await jwt.sign({
                _id: user._id,
                name: user.name,
                role: user.role,
                email
            }, process.env.SECRET)
        
        return token
    }

    Profile = async _id => this.RetrieveOneFiltered({ _id })
}
module.exports = new UserService(require('mongoose').model("User"))