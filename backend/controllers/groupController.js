const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js");
const Group = require("../models/groupModel.js");
const Movie = require("../models/movieModel.js");
const bcrypt = require("bcryptjs");

const createGroup = asyncHandler(async (req, res) => {
    
    console.log("____CREATE GROUP START____")
    

    const groupName = req.body.groupName.toLowerCase();
    const groupPassword = req.body.password;
    let groupType = "public"; 

    if(!groupName){
        res.status(400);
        throw new Error("CREATE: Please Enter Group Name")
    }
    
    if(groupPassword)
        groupType = "private";
    

    const groupExists = await Group.findOne({name: groupName});
    const salt = await bcrypt.genSalt(10);
    //This will be null if there is no entered password
    let hashedPassword = groupPassword ? await bcrypt.hash(groupPassword, salt) : null;
        

    if(groupExists){
        res.status(400)
        throw new Error("CREATE: Group Name Taken");
    }

    await Group.create({
            name: groupName,
            password: hashedPassword,
            owner: req.user.id,
            privacyType: groupType,
            users: []
    });
  
    let groupData = await Group.findOneAndUpdate({name: groupName}, {
            "$push": {"users": {
                "id": req.user.id
            }}
    });
    
    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }


    res.status(200).json(groupData)

        console.log("____CREATE GROUP END_____")
    
})

const joinGroup = asyncHandler(async (req, res) => {

    console.log("_____JOIN GROUP START_____");
    
    const enteredName = req.body.groupName.toLowerCase();
    const enteredPassword = req.body.password;

    if(!enteredName){
        res.status(400)
        throw new Error("JOIN: Please Enter Group Name");
    }

    const group = await Group.findOne({name: enteredName});
    let groupData = null;
    
    if(!group){
        res.status(400)
        throw new Error("JOIN: Group Does Not Exist");
    }
    else {
        //checks for groups that the user is in
        let groups = await Group.find({
            "users": {
                "$elemMatch": {id: req.user.id}
            }
        })
        //if the user is already in the group return error
        let alreadyAdded = groups.some((group) => group.name === enteredName);
        if(alreadyAdded){
            res.status(400);
            throw new Error("JOIN: Already in Group");
        }
        //If group exists check for privacy type and then if password matches the groups password
           if(group.privacyType == "public"){
    
                //Join Group
                groupData = await Group.findOneAndUpdate({name: enteredName}, {
                    "$push": {"users": {
                        "id": req.user.id
                    }}
                });
            

           }else{
                if(!enteredPassword){
                    res.status(400)
                    throw new Error("JOIN: Group Requires a Password");
                }else if(group && (await bcrypt.compare(enteredPassword, group.password))){
                        //Handles checking the equality of the hashed password in the database
                        //to the one entered in the join form
                       //Join Group
                    groupData = await Group.findOneAndUpdate({name: enteredName}, {
                    "$push": {"users": {
                        "id": req.user.id
                        }}
                    });
                     
                }else{
                    res.status(400)
                    throw new Error("JOIN: Incorrect Password");
                }
           }
    }

    if(!req.user){
        res.status(401)
        throw new Error("User not found");
       }
       
      ;
   
        res.status(200).json(groupData)
    

        console.log("_____JOIN GROUP END_____");
})

const getMyGroups = asyncHandler(async (req, res) => {

    let groups = await Group.find({
        "users": {
            "$elemMatch": {id: req.user.id}
        }
    })
    res.status(200).json(groups);
})

const leaveGroup = asyncHandler( async (req, res) => {

    const group = await Group.findOneAndUpdate({name: req.params.name},
        {
            "$pull": {"users": {"id": req.user.id}}
        })

    if(!group){
        res.status(400);
        throw new Error("Group not found");
    }
    
    //deletes group if the user was the last member when leaving
    if(group.users.length-1 == 0){
        await Group.deleteOne({name: req.params.name});
    }
     

   
    if(!req.user){
     res.status(401)
     throw new Error("User not found");
    }
 

    res.status(200).json({id: req.params.id})
})

const makeOwner = asyncHandler(async (req, res) => {
    const groupName = req.params.groupName;
    const newOwner = await User.findOne({name: req.params.userName});

    console.log(groupName, newOwner)

    let group = await Group.findOneAndUpdate({
        name: groupName
    }, {
        owner: newOwner._id
    })

    if(!group){
        res.status(400);
        throw new Error("Group not found");
    }

    if(!req.user){
     res.status(401)
     throw new Error("User not found");
    }
 
    res.status(200).json(newOwner)
});

const kickUser = asyncHandler(async (req, res) => {
    const groupName = req.params.groupName;
    const kickedUser = await User.findOne({name: req.params.userName});
    
    let group = await Group.findOneAndUpdate({
        "name": groupName
    }, {
        "$pull": {"users": {"id": kickedUser._id}}
    })

    if(!group){
        res.status(400);
        throw new Error("Group not found");
    }

    if(!req.user){
     res.status(401)
     throw new Error("User not found");
    }
 
    res.status(200).json(kickedUser)

})

const getGroupData = asyncHandler(async (req, res) => {

    const groupName = req.params.name;

    let group = await Group.findOne({
        "name": groupName
    })

    let userArray = [];
    for(let i = 0; i < group.users.length; i++){
        const user = await User.findById(group.users[i].id)
        userArray.push(user)
    }
   
    res.status(200).json({group, userArray});
})

const getAllGroups = asyncHandler(async (req, res) => {

    let groups = await Group.find({})
    res.status(200).json(groups);
})

const calculateGroupMovies = asyncHandler(async (req, res) => {

    let group = await Group.findOne({
        "name": req.params.groupName
    }) 

    if(!group){
        res.status(400);
        throw new Error("Group Not Found");
    }

    //movieIDS hold every Id of every movie collected
    //moviesArray holds the group data about every movie collected
    const allMovieIDS = [];
    let moviesArray = [];

    //loop over every user in the group
    for(let i = 0; i < group.users.length; i++){
        
        const user = await User.findById(group.users[i].id);
        const userMovies = user.movies;
        let currentMovie = {}
        
        for(movieObj of userMovies){

            
            const {movie: movieObjectID, rating} = movieObj;

            //movieObjectID = ID that points to Movie in Mongo Database

            //MOVIE DATA IN DATABASE
            const movie = await Movie.findOne({_id: movieObjectID});

            //TMDBS MOVIE ID
            const movieID = movie.movieId;
            
            //if movie already exists
            if(allMovieIDS.includes(movieID)){
                //removes the movie that is a duplicate for it to be replaced with new info
                movieDetails = moviesArray.find((movie) => movie.movieData.movieId == movieID);
                moviesArray = moviesArray.filter((movie) => movie.movieData.movieId != movieID);

                
                currentMovie = {
                    movieData: movie,
                    totalRating: movieDetails.totalRating + rating,
                    totalUsers: movieDetails.totalUsers + 1,
                    averageRating: (this.totalRating / this.totalUsers)
                }
            }
            //movie does not exist yet
            else{
                allMovieIDS.push(movieID);
                currentMovie = {
                    movieData: movie,
                    totalRating: rating,
                    totalUsers: 1,
                    averageRating: (this.totalRating / this.totalUsers)
                }
            }
            moviesArray.push(currentMovie);

        }
    }

    const topRated = [...moviesArray].sort((a,b) =>  (b.totalRating/b.totalUsers) - (a.totalRating/a.totalUsers));
    const lowestRated = [...moviesArray].sort((a,b) => (a.totalRating/a.totalUsers) - (b.totalRating/b.totalUsers));
    const mostRated = [...moviesArray].sort((a,b) => b.totalUsers - a.totalUsers);
    const leastRated = [...moviesArray].sort((a,b) => a.totalUsers - b.totalUsers);
    let movieFilters = {
        topRated: topRated,
        lowestRated: lowestRated,
        mostRated: mostRated,
        leastRated: leastRated
    }
    res.status(200).json(movieFilters);

})


module.exports = {
    createGroup,
    joinGroup,
    getMyGroups,
    leaveGroup,
    getGroupData,
    getAllGroups,
    kickUser,
    makeOwner,
    calculateGroupMovies
}