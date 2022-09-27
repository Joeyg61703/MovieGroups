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
    
    }else {
            res.status(400)
            throw new Error("Group Name Taken");
           
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
 

    res.status(200).json({id: req.params.id})
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

    console.log(group, userArray)
    
    res.status(200).json({group, userArray});
})

const getAllGroups = asyncHandler(async (req, res) => {

    let groups = await Group.find({})
    res.status(200).json(groups);
})


module.exports = {
    createGroup,
    getMyGroups,
    leaveGroup,
    getGroupData,
    getAllGroups
}