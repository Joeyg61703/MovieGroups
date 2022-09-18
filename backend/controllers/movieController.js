const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js");
const Movie = require("../models/movieModel.js");

const addMovie = asyncHandler(async (req, res) => {
    
    console.log("Test")

    const movieId = req.body.id;
  

    const movieExists = await Movie.findOne({movieId});

    if(!movieExists){
        const movie = await Movie.create({
            movieId: movieId, 
            image: req.body.image,
            title: req.body.title,
            users: [],
            userRating: 0 
        });
    
    }

    const movieData = await Movie.findOne({movieId});

    console.log(movieExists);

    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }
       
       let user = await User.findOne({_id: req.user.id});
    
    
        console.log(movieData)
        user = await User.findOneAndUpdate({_id: req.user.id}, 
            {"$push": {"movies": movieExists._id}});
        console.log(user.movies)
        res.status(200).json(movieData)
    
})

const getMyMovies = asyncHandler(async (req, res) => {

    const user = await User.findOne({_id: req.user.id});
    console.log(user.movies);
    let movies = [];
    for(let i = 0; i < user.movies.length; i++){
        const movie = await Movie.findById(user.movies[i]);
        movies.push(movie);
    }
    res.status(200).json(movies);
})

module.exports = {
    addMovie,
    getMyMovies
}