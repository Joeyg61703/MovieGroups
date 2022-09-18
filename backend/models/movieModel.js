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
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User', 
        default: []
    }],

    userRating:{
        type: Number,
        required: true,
        default: 0
    }


})

module.exports = mongoose.model("Movie", movieSchema);