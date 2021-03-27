const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String},
    email:{type: String},
    stories:[{type: mongoose.Schema.Types.ObjectId, ref:"Story"}]
},
{timestamps: true});

module.exports = mongoose.model("User", userSchema);