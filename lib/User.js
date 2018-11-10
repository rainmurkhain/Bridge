const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname: String,
    admin: {type: Boolean}
});

const User = mongoose.model('users', userSchema);
module.exports = User;

module.exports.findByUsername = function(username, cb) {
    const query = {username: username};
    User.findOne(query, cb);
};