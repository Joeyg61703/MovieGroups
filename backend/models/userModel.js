const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    movies: [{
        movie:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie', 
            required: true
        },
        rating:{
            type: Number,
            default: 0,
            required: true
        }
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);