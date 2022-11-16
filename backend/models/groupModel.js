const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: null,
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
    }],
    movies: [{
        id: {
            type: String,
            required: true,
            default: ""
        },
        totalRating: {
            type: Number,
            required: true,
            default: 0
        },
        totalUsers: {
            type: Number,
            required: true,
            default: 0
        },
        averageRating: {
            type: Number,
            required: true,
            default: 0
        }
    }]

},{
    timestamps: true
})

module.exports = mongoose.model("Group", groupSchema);