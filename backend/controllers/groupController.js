const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js");
const Group = require("../models/groupModel.js");

const createGroup = asyncHandler(async (req, res) => {
    
    console.log("Test")

    const groupName = req.body.groupName;
  

    const groupExists = await Group.findOne({name: groupName});

    if(!groupExists){
        const group = await Group.create({
            name: groupName,
            creator: req.user.id,
            users: []
        });
    
    }

    let groups = await Group.find({
        "users": {
            "$elemMatch": {id: req.user.id}
        }
    })

    let alreadyAdded = groups.some((group) => group.name === groupName)
    let groupData = null;

    if(!alreadyAdded){
         groupData = await Group.findOneAndUpdate({name: groupName}, {
            "$push": {"users": {
                "id": req.user.id
            }}
        });
    }
 
   
    console.log("Groups:", groups)
    // console.log(movieExists);

    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }
       
       let user = await User.findOne({_id: req.user.id});
    
    
        // console.log(movieData)
        // console.log(user.movies)
        res.status(200).json(groupData)
    
})

const getMyGroups = asyncHandler(async (req, res) => {

    // const user = await User.findOne({_id: req.user.id});
    // console.log(user.movies);
    // let movies = [];
    // for(let i = 0; i < user.movies.length; i++){
    //     const movie = await Movie.findById(user.movies[i].movie);
    //     movie.userRating = user.movies[i].rating;
    //     movies.push(movie);
    // }

    let groups = await Group.find({
        "users": {
            "$elemMatch": {id: req.user.id}
        }
    })
    res.status(200).json(groups);
})

const leaveGroup = asyncHandler( async (req, res) => {

    const group = await Group.findOneAndUpdate({_id: req.params.id,},
        {
            "$pull": {"users": {"id": req.user.id}}
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




module.exports = {
    createGroup,
    getMyGroups,
    leaveGroup
}