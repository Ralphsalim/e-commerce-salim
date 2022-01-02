const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username:String, 
  password: String,
  email:String, 
  Orders:Array, 
  Likes:Array,
  Cart:Array, 
  ShippingAddress:Object, 


});

module.exports = mongoose.model("User", UserSchema);
