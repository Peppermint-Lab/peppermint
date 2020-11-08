const mongoose = require('mongoose')


// Mongoose Schema for internal_users
const InternalUserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user'},
    pic: {type: String}
})


mongoose.model("InternalUser", InternalUserSchema)
