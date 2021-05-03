const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const User = mongoose.model('user', new Schema({
    email : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
    }
}))

module.exports = User;