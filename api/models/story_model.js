const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    story:{type: String},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    views :{type: Number, default: 0}
},
{timestamps: true});

module.exports = mongoose.model("Story", storySchema);