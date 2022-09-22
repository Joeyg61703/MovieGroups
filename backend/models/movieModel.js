const mongoose = require("mongoose");


const movieSchema = new mongoose.Schema({
    movieId: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    users:  [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        rating:{
            type: Number,
            default: 0
        },
        review:{
            message:{
                type: String,
                default: null
            },
            rating: {
                type: Number,
                default: 0,
            }
        }
    }],

    userRating:{
        type: Number,
        required: true,
        default: 0
    }


})

module.exports = mongoose.model("Movie", movieSchema);