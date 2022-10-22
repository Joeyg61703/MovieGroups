const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

const registerUser = asyncHandler(async (req, res) => {
    let {name, email, password} = req.body

    email = email.toLowerCase();
    name = name.toLowerCase();
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields");
    }

    
    const emailTaken = await User.findOne({email});
    const nameTaken = await User.findOne({name});

    if(emailTaken){
        res.status(400);
        throw new Error("Email already taken");
    }
    if(nameTaken){
        res.status(400);
        throw new Error("Name already taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    console.log(user)

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            movies: user.movies,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data");
    }

   
})

const loginUser = asyncHandler(async (req, res) => {
    let {email, password} = req.body;

    email = email.toLowerCase();
    const user = await User.findOne({email});
    

    //Handles checking the equality of the hashed password in the database
    //to the one entered in the login form
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            movies: user.movies,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid Credentials");
    }

   
})
const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}