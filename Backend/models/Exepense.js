const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    amount: Number,
    loginUser: {
      type:String,
    },
    type:String,
    users:[
        {
            name:String,
            balance:Number
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Expense", expenseSchema);