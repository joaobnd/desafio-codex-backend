const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'um usuario precisa de nome']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'um usuario precisa de email']
    },
    password: {
        type: String,
        required: [true, 'um usuario precisa de senha'],
        selected: false
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',

    }],
})

const User = mongoose.model('User', UserSchema)

module.exports = User
