const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    user: {type: String, required: true},
    password: {type: String, required: true}
});


module.exports = mongoose.model('users', usersSchema)