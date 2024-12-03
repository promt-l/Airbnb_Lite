const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    // }
});

// username, hashing, salting created by User.plugin
userSchema.plugin(passportLocalMongoose);        

module.exports = mongoose.model('User', userSchema);