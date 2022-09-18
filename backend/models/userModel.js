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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        default: [],
        required: true
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);