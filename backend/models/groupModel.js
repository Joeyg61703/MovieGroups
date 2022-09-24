const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    users: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        role: {
            type: String,
            default: "member",
            required: true
        }
    }]

},{
    timestamps: true
})

module.exports = mongoose.model("Group", groupSchema);