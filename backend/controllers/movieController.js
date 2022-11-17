const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js");
const Movie = require("../models/movieModel.js");
const { default: mongoose } = require("mongoose");

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

    let movies = await Movie.find({
        "users": {
            "$elemMatch": {user: req.user.id}
        }
    })

    let alreadyAdded = movies.some((movie) => movie.movieId === movieId)
    let movieData = null;

    if(!alreadyAdded){
         movieData = await Movie.findOneAndUpdate({movieId}, {
            "$push": {"users": {
                "user": req.user.id
            }}
        });
    }
 
   
    console.log("Movie:", movies)
    // console.log(movieExists);

    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }
       
       let user = await User.findOne({_id: req.user.id});
    
    
        // console.log(movieData)
        user = await User.findOneAndUpdate({_id: req.user.id}, 
            {"$push": {"movies": {"movie": movieData._id}}});
        // console.log(user.movies)
        res.status(200).json(movieData)
    
})

const getMyMovies = asyncHandler(async (req, res) => {

    let movies = await Movie.find({
        "users": {
            "$elemMatch": {user: req.user.id}
        }
    })
    res.status(200).json(movies);
})

const getUserMovies = asyncHandler(async (req, res) => {

    console.log("Test")
    const user = await User.findOne({name: req.params.name});
    console.log("User: ", user)
    let movies = await Movie.find({
        "users": {
            "$elemMatch": {user: user._id}
        }
    })
    res.status(200).json({movies: movies, user: user});
})

const deleteMovie = asyncHandler( async (req, res) => {

    const movie = await Movie.findOneAndUpdate({_id: req.params.id,},
        {
            "$pull": {"users": {"user": req.user.id}}
        })
    const user = await User.findOneAndUpdate({_id: req.user.id},
        {
            "$pull": {"movies": {"movie": req.params.id}}
        })
     
    if(!movie){
        res.status(400);
        throw new Error("Movie not found");
    }

   
    if(!req.user){
     res.status(401)
     throw new Error("User not found");
    }
 
    //Checks if movie doesnt belong to logged in user
    // if(movie.user.toString() !== req.user.id){
    //      res.status(401);
    //      throw new Error("User not authorized");
    // }


    res.status(200).json({id: req.params.id})
})


const rateMovie = asyncHandler( async (req, res) => {

    console.log(req.params.rating)
    console.log(req.params.id)

    const movie = await Movie.findOneAndUpdate({_id: req.params.id},
        {
            "$set": {"users.$[array].rating": Number(req.params.rating)}
        },
        {
            "arrayFilters": [
                {
                    "array.user": req.user.id
                }
            ]
        })

    const user = await User.findOneAndUpdate({_id: req.user.id}, {
        
            "$set": {"movies.$[array].rating": Number(req.params.rating)}
        },
        {
            "arrayFilters": [
                {
                    "array.movie": mongoose.Types.ObjectId(req.params.id)
                }
            ]
        })


    // const movie = await Movie.findOne({_id: req.params.id});

    // const user = movie.users.filter(user => user === req.user.id)[0];
   
    // console.log(user)

    if(!movie){
        res.status(400);
        throw new Error("Movie not found");
    }

   
    if(!req.user){
     res.status(401)
     throw new Error("User not found");
    }
 
    //Checks if movie doesnt belong to logged in user
    // if(movie.user.toString() !== req.user.id){
    //      res.status(401);
    //      throw new Error("User not authorized");
    // }


    res.status(200).json({rating: req.params.rating})
})

module.exports = {
    addMovie,
    getMyMovies,
    deleteMovie,
    rateMovie,
    getUserMovies
}