const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    privacyType: {
        type: String,
        required: true,
        default: ""
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