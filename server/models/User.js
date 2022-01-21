const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username:String, 
  password: String,
  email:String, 
  phonenumber:Number,
  orders:Array, 
  likes:Array,
  cart:Array, 
  billingAdress:Object, 
  birthDate: String,


});

module.exports = mongoose.model("User", UserSchema);
