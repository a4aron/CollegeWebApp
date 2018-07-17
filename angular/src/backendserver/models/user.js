const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
// create schema of User
const userSchema = mongoose.Schema({
  //unique wont validate that the email is unique, using third party package here. we can use asyn validator too?
  email : { type : String, required: true, unique: true},
  password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
