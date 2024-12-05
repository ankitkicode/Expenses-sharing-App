const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name:String,
   email:String,
   number:String,
   balance:String,
});

module.exports = mongoose.model("User",userSchema);