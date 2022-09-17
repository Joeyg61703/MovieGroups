const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js");

const addMovie = asyncHandler(async (req, res) => {
    const movieId = req.body.id;
    if(!movieId){
        res.status(400)
        throw new Error("Invalid Movie.");
    }

    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }
       
       const user = await User.findOne({_id: req.user.id});
    
    if(user.movies.includes(movieId)){
        console.log("Movie Inside")
    }
    else{
        user = await User.findOneAndUpdate({_id: req.user.id}, {"$push": {"movies": movieId}} );
        console.log(user.movies)
        res.status(200).json(movieId)
    }
})

module.exports = {
    addMovie
}