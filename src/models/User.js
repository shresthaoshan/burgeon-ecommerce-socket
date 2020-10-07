const mongoose = require('mongoose')
const encryptPassword = require('../helpers/encryptPassword')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "User's Full Name is required."
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email is required."],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Specified email address is not valid."]
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    const user = await this.constructor.findOne({ email: this.email });

    if (user) throw "Email already taken.";

    if (!this.password) throw "Password is required."

    if (this.password.length < 6) throw "Password must be atleast 6 characters long."

    this.password = await encryptPassword(this.password)

    next();
});

module.exports = mongoose.model('User', userSchema);